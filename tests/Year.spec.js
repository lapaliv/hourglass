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

    it('startOfYear', () => {
        const hourglass = Hourglass.create(3000, 8, 9, 10, 11, 12);
        compareYear(hourglass, 3000);
        expect(hourglass.month).toBe(8);
        expect(hourglass.day).toBe(9);
        expect(hourglass.hour).toBe(10);
        expect(hourglass.minute).toBe(11);
        expect(hourglass.second).toBe(12);

        hourglass.startOfYear();
        compareYear(hourglass, 3000);
        expect(hourglass.month).toBe(1);
        expect(hourglass.day).toBe(1);
        expect(hourglass.hour).toBe(0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.second).toBe(0);
    });

    it('endOfYear', () => {
        const hourglass = Hourglass.create(2050, 9, 10, 11, 12, 13);
        compareYear(hourglass, 2050);
        expect(hourglass.month).toBe(9);
        expect(hourglass.day).toBe(10);
        expect(hourglass.hour).toBe(11);
        expect(hourglass.minute).toBe(12);
        expect(hourglass.second).toBe(13);

        hourglass.endOfYear();
        compareYear(hourglass, 2050);
        expect(hourglass.month).toBe(12);
        expect(hourglass.day).toBe(31);
        expect(hourglass.hour).toBe(23);
        expect(hourglass.minute).toBe(59);
        expect(hourglass.second).toBe(59);
    });

    describe('isLeapYear', () => {
        it('2020', () => {
            const hourglass = Hourglass.createFromDate(2020, 1, 1);
            expect(hourglass.isLeapYear).toBe(true);
        });
        it('2019', () => {
            const hourglass = Hourglass.createFromDate(2019, 1, 1);
            expect(hourglass.isLeapYear).toBe(false);
        });
        it('2016', () => {
            const hourglass = Hourglass.createFromDate(2016, 1, 1);
            expect(hourglass.isLeapYear).toBe(true);
        });
    });

    let daysInYearNames = {
        getDaysInYear: 'method',
        getCountDaysInYear: 'method',
        daysInYear: 'property',
        countDaysInYear: 'property',
    };

    for (const methodOrPropertyName in daysInYearNames) {
        describe(methodOrPropertyName, () => {
            it('2020', () => {
                const hourglass = Hourglass.createFromDate(2020, 1, 1);
                if (daysInYearNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(366);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(366);
                }
            });
            it('2019', () => {
                const hourglass = Hourglass.createFromDate(2019, 1, 1);
                if (daysInYearNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(365);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(365);
                }
            });
        });
    }

    describe('diffInYears', () => {
        it('1900-2000', () => {
            const start = Hourglass.createFromDate(1900);
            const end = Hourglass.createFromDate(2000);

            console.log(start, end);

            expect(start.diffInYears(end)).toBe(100);
        });
        it('1234-678', () => {
            const start = Hourglass.createFromDate(1234);
            const end = Hourglass.createFromDate(678);

            expect(start.diffInYears(end)).toBe(556);
        });
        it('2008-2030', () => {
            const start = Hourglass.createFromDate(2008, 11, 1);
            const end = new Date(2030, 4, 1, 0, 0, 0);

            expect(start.diffInYears(end)).toBe(21);
        });
        it('2008-2030', () => {
            const start = Hourglass.createFromDate(2008);
            const end = new Date(2030, 0, 1, 0, 0, 0);

            expect(start.diffInYears(end)).toBe(22);
        });
    });
});

function compareYear(hourglass, expected) {
    expect(hourglass.year).toBe(expected);
    expect(hourglass.getYear()).toBe(expected);
}
