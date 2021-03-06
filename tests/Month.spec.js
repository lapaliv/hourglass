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

    it('startOfMonth', () => {
        const hourglass = Hourglass.create(1001, 2, 3, 4, 5, 6);
        expect(hourglass.year).toBe(1001);
        compareMonth(hourglass, 2);
        expect(hourglass.day).toBe(3);
        expect(hourglass.hour).toBe(4);
        expect(hourglass.minute).toBe(5);
        expect(hourglass.second).toBe(6);

        hourglass.startOfMonth();
        expect(hourglass.year).toBe(1001);
        compareMonth(hourglass, 2);
        expect(hourglass.day).toBe(1);
        expect(hourglass.hour).toBe(0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.second).toBe(0);
    });

    it('endOfMonth', () => {
        const hourglass = Hourglass.create(2020, 2, 11, 12, 13, 14);
        expect(hourglass.year).toBe(2020);
        compareMonth(hourglass, 2);
        expect(hourglass.day).toBe(11);
        expect(hourglass.hour).toBe(12);
        expect(hourglass.minute).toBe(13);
        expect(hourglass.second).toBe(14);

        hourglass.endOfMonth();
        expect(hourglass.year).toBe(2020);
        compareMonth(hourglass, 2);
        expect(hourglass.day).toBe(29);
        expect(hourglass.hour).toBe(23);
        expect(hourglass.minute).toBe(59);
        expect(hourglass.second).toBe(59);
    });

    let daysInMonthNames = {
        daysInMonth: 'property',
        countDaysInMonth: 'property',
        getDaysInMonth: 'method',
        getCountDaysInMonth: 'method',
    };

    for (const methodOrPropertyName in daysInMonthNames) {
        describe(methodOrPropertyName, () => {
            it('2020-02', () => {
                const hourglass = Hourglass.createFromDate(2020, 2);
                if (daysInMonthNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(29);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(29);
                }
            });
            it('2020-03', () => {
                const hourglass = Hourglass.createFromDate(2020, 3);
                if (daysInMonthNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(31);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(31);
                }
            });
            it('2020-04', () => {
                const hourglass = Hourglass.createFromDate(2020, 4);
                if (daysInMonthNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(30);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(30);
                }
            });
            it('2020-08', () => {
                const hourglass = Hourglass.createFromDate(2020, 8);
                if (daysInMonthNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(31);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(31);
                }
            });
        });
    }

    describe('diffInMonths', () => {
        it('from 2008-12 to 2030-05', () => {
            const startHourglass = Hourglass.createFromDate(2008, 12);
            const endHourglass = Hourglass.createFromDate(2030, 5);

            expect(startHourglass.diffInMonths(endHourglass)).toBe(257);
        });
        it('from 2008-12-02 to 2030-05-01', () => {
            const startHourglass = Hourglass.createFromDate(2008, 12, 2);
            const endHourglass = Hourglass.createFromDate(2030, 5);

            expect(startHourglass.diffInMonths(endHourglass)).toBe(256);
        });
        it('from 2003-06 to 1999-03', () => {
            const startHourglass = Hourglass.createFromDate(2003, 6, 18);
            const endHourglass = Hourglass.createFromDate(1999, 3, 30);

            expect(startHourglass.diffInMonths(endHourglass)).toBe(50);
        });
        it('from 2005-11 to 2000-11', () => {
            const startHourglass = Hourglass.createFromDate(2005, 11, 11);
            const endHourglass = Hourglass.createFromDate(2000, 11, 11);

            expect(startHourglass.diffInMonths(endHourglass)).toBe(60);
        });
    });
});

function compareMonth(hourglass, expected) {
    expect(hourglass.month).toBe(expected);
    expect(hourglass.getMonth()).toBe(expected);
}
