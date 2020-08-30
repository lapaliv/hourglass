import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('day', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromDate(2020, 5, 19);
        compareDay(hourglass, 19);
        expect(hourglass.month).toBe(5);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(8);
        compareDay(hourglass, 8);
        expect(hourglass.month).toBe(5);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(32);
        compareDay(hourglass, 1);
        expect(hourglass.month).toBe(6);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(-3);
        compareDay(hourglass, 28);
        expect(hourglass.month).toBe(5);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(0);
        compareDay(hourglass, 30);
        expect(hourglass.month).toBe(4);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(-33);
        compareDay(hourglass, 27);
        expect(hourglass.month).toBe(2);
        expect(hourglass.year).toBe(2020);

        hourglass.setDay(-100);
        compareDay(hourglass, 23);
        expect(hourglass.month).toBe(10);
        expect(hourglass.year).toBe(2019);
    });

    it('add', () => {
        const hourglass = Hourglass.createFromDate(1970, 1, 1);
        compareDay(hourglass, 1);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDay();
        compareDay(hourglass, 2);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDay(22);
        compareDay(hourglass, 24);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays();
        compareDay(hourglass, 25);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays(2);
        compareDay(hourglass, 27);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays(0);
        compareDay(hourglass, 27);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays(40);
        compareDay(hourglass, 8);
        expect(hourglass.month).toBe(3);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays(-40);
        compareDay(hourglass, 27);
        expect(hourglass.month).toBe(1);
        expect(hourglass.year).toBe(1970);

        hourglass.addDays(-100);
        compareDay(hourglass, 19);
        expect(hourglass.month).toBe(10);
        expect(hourglass.year).toBe(1969);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromDate(2030, 10, 12);
        compareDay(hourglass, 12);
        expect(hourglass.month).toBe(10);
        expect(hourglass.year).toBe(2030);

        hourglass.subDay();
        compareDay(hourglass, 11);
        expect(hourglass.month).toBe(10);
        expect(hourglass.year).toBe(2030);

        hourglass.subDay(22);
        compareDay(hourglass, 19);
        expect(hourglass.month).toBe(9);
        expect(hourglass.year).toBe(2030);

        hourglass.subDays();
        compareDay(hourglass, 18);
        expect(hourglass.month).toBe(9);
        expect(hourglass.year).toBe(2030);

        hourglass.subDays(2);
        compareDay(hourglass, 16);
        expect(hourglass.month).toBe(9);
        expect(hourglass.year).toBe(2030);

        hourglass.subDays(0);
        compareDay(hourglass, 16);
        expect(hourglass.month).toBe(9);
        expect(hourglass.year).toBe(2030);

        hourglass.subDays(500);
        compareDay(hourglass, 4);
        expect(hourglass.month).toBe(5);
        expect(hourglass.year).toBe(2029);

        hourglass.subDays(-500);
        compareDay(hourglass, 16);
        expect(hourglass.month).toBe(9);
        expect(hourglass.year).toBe(2030);
    });
});

function compareDay(hourglass, expected) {
    expect(hourglass.day).toBe(expected);
    expect(hourglass.getDay()).toBe(expected);
}
