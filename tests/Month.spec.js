import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('month', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromDate(2000, 3, 1);
        compareMonth(hourglass, 3);
        expect(hourglass.year).toBe(2000);

        hourglass.month = 5;
        compareMonth(hourglass, 5);
        expect(hourglass.year).toBe(2000);

        hourglass.setMonth(8);
        compareMonth(hourglass, 8);
        expect(hourglass.year).toBe(2000);

        hourglass.setMonth(13);
        compareMonth(hourglass, 1);
        expect(hourglass.year).toBe(2001);

        hourglass.setMonth(0);
        compareMonth(hourglass, 12);
        expect(hourglass.year).toBe(2000);

        hourglass.setMonth(-20);
        compareMonth(hourglass, 4);
        expect(hourglass.year).toBe(1998);
    });

    it('add', () => {
        const hourglass = Hourglass.createFromDate(1980, 7, 8);
        compareMonth(hourglass, 7);
        expect(hourglass.year).toBe(1980);

        hourglass.addMonth();
        compareMonth(hourglass, 8);
        expect(hourglass.year).toBe(1980);

        hourglass.addMonth(2);
        compareMonth(hourglass, 10);
        expect(hourglass.year).toBe(1980);

        hourglass.addMonths();
        compareMonth(hourglass, 11);
        expect(hourglass.year).toBe(1980);

        hourglass.addMonths(3);
        compareMonth(hourglass, 2);
        expect(hourglass.year).toBe(1981);

        hourglass.addMonths(0);
        compareMonth(hourglass, 2);
        expect(hourglass.year).toBe(1981);

        hourglass.addMonths(-13);
        compareMonth(hourglass, 1);
        expect(hourglass.year).toBe(1980);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromDate(3001, 4, 1);
        compareMonth(hourglass, 4);
        expect(hourglass.year).toBe(3001);

        hourglass.subMonth();
        compareMonth(hourglass, 3);
        expect(hourglass.year).toBe(3001);

        hourglass.subMonth(2);
        compareMonth(hourglass, 1);
        expect(hourglass.year).toBe(3001);

        hourglass.subMonths();
        compareMonth(hourglass, 12);
        expect(hourglass.year).toBe(3000);

        hourglass.subMonths(3);
        compareMonth(hourglass, 9);
        expect(hourglass.year).toBe(3000);

        hourglass.subMonths(0);
        compareMonth(hourglass, 9);
        expect(hourglass.year).toBe(3000);

        hourglass.subMonths(-13);
        compareMonth(hourglass, 10);
        expect(hourglass.year).toBe(3001);
    });
});

function compareMonth(hourglass, expected) {
    expect(hourglass.month).toBe(expected);
    expect(hourglass.getMonth()).toBe(expected);
}
