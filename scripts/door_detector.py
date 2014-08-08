"""
Script that runs on the Raspberry Pi that the sensors are attached to.
You'll also need a file config.py which should contain the following:

floor: the number of the floor the script is monitoring
pins: a list of which pins are being used for the door sensors
server: a string containing the url of the server to send updates to
"""

from RPi import GPIO
from config import floor, server, pins
from time import sleep
import urllib2, urllib

def main():
    door_detector = DoorDetector()
    door_detector.setup()
    door_detector.start()

class DoorInfo(object):
    def __init__(self, channel):
        self.channel = channel
        self.state = None

class DoorDetector(object):
    def __init__(self):
        self.doors = []
        for pin_num in pins:
            self.doors.append(DoorInfo(pin_num))

    def setup(self):
        GPIO.setmode(GPIO.BOARD)
        for door in self.doors:
            GPIO.setup(door.channel, GPIO.IN, pull_up_down=GPIO.PUD_UP)
            door.state = GPIO.input(door.channel)
            assert door.state is not None

    def start(self):
        while True:
            for door_num, door in enumerate(self.doors):
                state = GPIO.input(door.channel)
                if state != door.state:
                    if state == 1:
                        self.vacate(door_num)
                    else:
                        self.occupy(door_num)
                    door.state = state

            sleep(0.5)

        GPIO.cleanup()

    @classmethod
    def occupy(cls, door):
        global_door = cls.get_global_door(door)
        data = {'bathroom_id': global_door}
        encoded_data = urllib.urlencode(data)
        url = "%s/occupied?%s" % (server, encoded_data)
        urllib2.urlopen(url)

    @classmethod
    def vacate(cls, door):
        global_door = cls.get_global_door(door)
        data = {'bathroom_id': global_door}
        encoded_data = urllib.urlencode(data)
        url = "%s/unoccupied?%s" % (server, encoded_data)
        urllib2.urlopen(url)

    @classmethod
    def get_global_door(cls, door):
        """
        Each pi only knows about doors 0 and 1.
        In order to send requests to the server
        we need to know about doors 1, 2, 3, and 4.
        Use the floor and internal door number to
        get one the server understands

        3rd Floor:
        0 -> 1
        1 -> 2

        4th FLoor:
        0 -> 3
        1 -> 4
        """
        return (floor-3)*2 + door + 1

if __name__ == '__main__':
    main()
