import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('minute', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromTime();
        compareMinute(hourglass, 0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.minute = 8;
        compareMinute(hourglass, 8);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.setMinute(77);
        compareMinute(hourglass, 17);
        expect(hourglass.hour).toBe(1);
        compareDate(hourglass);

        hourglass.setMinute(21);
        compareMinute(hourglass, 21);
        expect(hourglass.hour).toBe(1);
        compareDate(hourglass);

        hourglass.setMinutes(483);
        compareMinute(hourglass, 3);
        expect(hourglass.hour).toBe(9);
        compareDate(hourglass);

        hourglass.setMinutes(-5);
        compareMinute(hourglass, 55);
        expect(hourglass.hour).toBe(8);
        compareDate(hourglass);
    });

    it('add', () => {
        const hourglass = Hourglass.createFromTime();
        compareMinute(hourglass, 0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addMinute();
        compareMinute(hourglass, 1);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addMinute(6);
        compareMinute(hourglass, 7);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addMinutes();
        compareMinute(hourglass, 8);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addMinutes(10);
        compareMinute(hourglass, 18);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addMinutes(43);
        compareMinute(hourglass, 1);
        expect(hourglass.hour).toBe(1);
        compareDate(hourglass);

        hourglass.addMinutes(-2);
        compareMinute(hourglass, 59);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromTime(3, 9);
        compareMinute(hourglass, 9);
        expect(hourglass.hour).toBe(3);
        compareDate(hourglass);

        hourglass.subMinute();
        compareMinute(hourglass, 8);
        expect(hourglass.hour).toBe(3);
        compareDate(hourglass);

        hourglass.subMinute(2);
        compareMinute(hourglass, 6);
        expect(hourglass.hour).toBe(3);
        compareDate(hourglass);

        hourglass.subMinutes();
        compareMinute(hourglass, 5);
        expect(hourglass.hour).toBe(3);
        compareDate(hourglass);

        hourglass.subMinutes(5);
        compareMinute(hourglass, 0);
        expect(hourglass.hour).toBe(3);
        compareDate(hourglass);

        hourglass.subMinutes(60);
        compareMinute(hourglass, 0);
        expect(hourglass.hour).toBe(2);
        compareDate(hourglass);
    });
});

function compareMinute(hourglass, expected) {
    expect(hourglass.minute).toBe(expected);
    expect(hourglass.getMinute()).toBe(expected);
    expect(hourglass.getMinutes()).toBe(expected);
}

function compareDate(hourglass) {
    const now = new Date();

    expect(hourglass.day).toBe(now.getUTCDate());
    expect(hourglass.month).toBe(now.getUTCMonth() + 1);
    expect(hourglass.year).toBe(now.getUTCFullYear());
}
