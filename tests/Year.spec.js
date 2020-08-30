import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('year', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromDate(2008, 1, 1);
        compareYear(hourglass, 2008);

        hourglass.year = 1698;
        compareYear(hourglass, 1698);

        hourglass.setYear(1432);
        compareYear(hourglass, 1432);

        hourglass.setYear(0);
        compareYear(hourglass, 0);

        hourglass.setYear(9999);
        compareYear(hourglass, 9999);

        try {
            hourglass.setYear(-20);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.toString()).toBe('Error: Trying to overflow the year');
        }
    });

    it('add', () => {
        const hourglass = Hourglass.createFromDate(1980, 1, 1);
        compareYear(hourglass, 1980);

        hourglass.addYear();
        compareYear(hourglass, 1981);

        hourglass.addYear(2);
        compareYear(hourglass, 1983);

        hourglass.addYears();
        compareYear(hourglass, 1984);

        hourglass.addYears(3);
        compareYear(hourglass, 1987);

        hourglass.addYears(0);
        compareYear(hourglass, 1987);

        hourglass.addYears(-13);
        compareYear(hourglass, 1974);
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromDate(3001, 1, 1);
        compareYear(hourglass, 3001);

        hourglass.subYear();
        compareYear(hourglass, 3000);

        hourglass.subYear(2);
        compareYear(hourglass, 2998);

        hourglass.subYears();
        compareYear(hourglass, 2997);

        hourglass.subYears(3);
        compareYear(hourglass, 2994);

        hourglass.subYears(0);
        compareYear(hourglass, 2994);

        hourglass.subYears(-13);
        compareYear(hourglass, 3007);
    });
});

function compareYear(hourglass, expected) {
    expect(hourglass.year).toBe(expected);
    expect(hourglass.getYear()).toBe(expected);
}
