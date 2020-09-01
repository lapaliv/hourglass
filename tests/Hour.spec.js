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

    describe('startOfHour', () => {
        it('01:02:03', () => {
            const hourglass = Hourglass.createFromTime(1, 2, 3);
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(2);
            expect(hourglass.second).toBe(3);
            compareDate(hourglass);

            hourglass.startOfHour();
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(0);
            expect(hourglass.second).toBe(0);
            compareDate(hourglass);
        });
        it('01:00:00', () => {
            const hourglass = Hourglass.createFromTime(1, 0, 0);
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(0);
            expect(hourglass.second).toBe(0);
            compareDate(hourglass);

            hourglass.startOfHour();
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(0);
            expect(hourglass.second).toBe(0);
            compareDate(hourglass);
        });
    });

    describe('endOfHour', () => {
        it('01:02:03', () => {
            const hourglass = Hourglass.createFromTime(1, 2, 3);
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(2);
            expect(hourglass.second).toBe(3);
            compareDate(hourglass);

            hourglass.endOfHour();
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(59);
            expect(hourglass.second).toBe(59);
            compareDate(hourglass);
        });
        it('01:59:59', () => {
            const hourglass = Hourglass.createFromTime(1, 59, 59);
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(59);
            expect(hourglass.second).toBe(59);
            compareDate(hourglass);

            hourglass.endOfHour();
            compareHour(hourglass, 1);
            expect(hourglass.minute).toBe(59);
            expect(hourglass.second).toBe(59);
            compareDate(hourglass);
        });
    });
});

function compareHour(hourglass, expected) {
    expect(hourglass.hour).toBe(expected);
    expect(hourglass.getHour()).toBe(expected);
    expect(hourglass.getHours()).toBe(expected);
}

function compareDate(hourglass, dayTerm = 0) {
    const now = new Date();
    now.setDate(now.getUTCDate() + dayTerm);

    expect(hourglass.day).toBe(now.getUTCDate());
    expect(hourglass.month).toBe(now.getUTCMonth() + 1);
    expect(hourglass.year).toBe(now.getUTCFullYear());
}
