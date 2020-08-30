import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('second', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromTime();
        compareSecond(hourglass, 0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.second = 3;
        compareSecond(hourglass, 3);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.setSecond(65);
        compareSecond(hourglass, 5);
        expect(hourglass.minute).toBe(1);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.setSeconds(33);
        compareSecond(hourglass, 33);
        expect(hourglass.minute).toBe(1);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.setSeconds(3600);
        compareSecond(hourglass, 0);
        expect(hourglass.minute).toBe(1);
        expect(hourglass.hour).toBe(1);
        compareDate(hourglass);

        hourglass.setSeconds(-1);
        compareSecond(hourglass, 59);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(1);
        compareDate(hourglass);
    });

    it('add', () => {
        const hourglass = Hourglass.createFromTime();
        compareSecond(hourglass, 0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addSecond();
        compareSecond(hourglass, 1);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addSecond(10);
        compareSecond(hourglass, 11);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addSeconds(22);
        compareSecond(hourglass, 33);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addSeconds(58);
        compareSecond(hourglass, 31);
        expect(hourglass.minute).toBe(1);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);

        hourglass.addSeconds(-7);
        compareSecond(hourglass, 24);
        expect(hourglass.minute).toBe(1);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromTime(10, 10, 10);
        compareSecond(hourglass, 10);
        expect(hourglass.minute).toBe(10);
        expect(hourglass.hour).toBe(10);
        compareDate(hourglass);

        hourglass.subSecond();
        compareSecond(hourglass, 9);
        expect(hourglass.minute).toBe(10);
        expect(hourglass.hour).toBe(10);
        compareDate(hourglass);

        hourglass.subSeconds(5);
        compareSecond(hourglass, 4);
        expect(hourglass.minute).toBe(10);
        expect(hourglass.hour).toBe(10);
        compareDate(hourglass);

        hourglass.subSeconds(10);
        compareSecond(hourglass, 54);
        expect(hourglass.minute).toBe(9);
        expect(hourglass.hour).toBe(10);
        compareDate(hourglass);

        hourglass.subSeconds(595);
        compareSecond(hourglass, 59);
        expect(hourglass.minute).toBe(59);
        expect(hourglass.hour).toBe(9);
        compareDate(hourglass);

        hourglass.subSeconds(35999);
        compareSecond(hourglass, 0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.hour).toBe(0);
        compareDate(hourglass);
    });
});

function compareSecond(hourglass, expected) {
    expect(hourglass.second).toBe(expected);
    expect(hourglass.getSecond()).toBe(expected);
    expect(hourglass.getSeconds()).toBe(expected);
}

function compareDate(hourglass) {
    const now = new Date();

    expect(hourglass.day).toBe(now.getUTCDate());
    expect(hourglass.month).toBe(now.getUTCMonth() + 1);
    expect(hourglass.year).toBe(now.getUTCFullYear());
}
