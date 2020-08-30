import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('hour', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromTime();
        compareHour(hourglass, 0);
        compareDate(hourglass, 0);

        hourglass.hour = 4;
        compareHour(hourglass, 4);
        compareDate(hourglass, 0);

        hourglass.setHour(25);
        compareHour(hourglass, 1);
        compareDate(hourglass, 1);

        hourglass.setHour(-10);
        compareHour(hourglass, 14);
        compareDate(hourglass, 0);
    });

    it('add', () => {
        const hourglass = Hourglass.createFromTime();
        compareHour(hourglass, 0);
        compareDate(hourglass, 0);

        hourglass.addHour();
        compareHour(hourglass, 1);
        compareDate(hourglass, 0);

        hourglass.addHour(2);
        compareHour(hourglass, 3);
        compareDate(hourglass, 0);

        hourglass.addHours();
        compareHour(hourglass, 4);
        compareDate(hourglass, 0);

        hourglass.addHours(3);
        compareHour(hourglass, 7);
        compareDate(hourglass, 0);

        hourglass.addHours(30);
        compareHour(hourglass, 13);
        compareDate(hourglass, 1);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromTime(20);
        compareHour(hourglass, 20);
        compareDate(hourglass, 0);

        hourglass.subHour();
        compareHour(hourglass, 19);
        compareDate(hourglass, 0);

        hourglass.subHour(2);
        compareHour(hourglass, 17);
        compareDate(hourglass, 0);

        hourglass.subHours();
        compareHour(hourglass, 16);
        compareDate(hourglass, 0);

        hourglass.subHours(10);
        compareHour(hourglass, 6);
        compareDate(hourglass, 0);

        hourglass.subHours(7);
        compareHour(hourglass, 23);
        compareDate(hourglass, -1);
    });
});

function compareHour(hourglass, expected) {
    expect(hourglass.hour).toBe(expected);
    expect(hourglass.getHour()).toBe(expected);
    expect(hourglass.getHours()).toBe(expected);
}

function compareDate(hourglass, dayTerm = 0) {
    const now = new Date();

    expect(hourglass.day).toBe(now.getUTCDate() + dayTerm);
    expect(hourglass.month).toBe(now.getUTCMonth() + 1);
    expect(hourglass.year).toBe(now.getUTCFullYear());
}
