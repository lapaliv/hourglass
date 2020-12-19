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

    it('startOfDay', () => {
        const hourglass = Hourglass.create(2020, 1, 2, 3, 4, 5);
        expect(hourglass.year).toBe(2020);
        expect(hourglass.month).toBe(1);
        compareDay(hourglass, 2);
        expect(hourglass.hour).toBe(3);
        expect(hourglass.minute).toBe(4);
        expect(hourglass.second).toBe(5);

        hourglass.startOfDay();
        expect(hourglass.year).toBe(2020);
        expect(hourglass.month).toBe(1);
        compareDay(hourglass, 2);
        expect(hourglass.hour).toBe(0);
        expect(hourglass.minute).toBe(0);
        expect(hourglass.second).toBe(0);
    });

    it('endOfDay', () => {
        const hourglass = Hourglass.create(2020, 5, 6, 7, 8, 9);
        expect(hourglass.year).toBe(2020);
        expect(hourglass.month).toBe(5);
        compareDay(hourglass, 6);
        expect(hourglass.hour).toBe(7);
        expect(hourglass.minute).toBe(8);
        expect(hourglass.second).toBe(9);

        hourglass.endOfDay();
        expect(hourglass.year).toBe(2020);
        expect(hourglass.month).toBe(5);
        compareDay(hourglass, 6);
        expect(hourglass.hour).toBe(23);
        expect(hourglass.minute).toBe(59);
        expect(hourglass.second).toBe(59);
    });

    let dayOfYearNames = {
        dayOfYear: 'property',
        getDayOfYear: 'method',
    };
    for (let methodOrPropertyName in dayOfYearNames) {
        describe(methodOrPropertyName, () => {
            it('2020-01-01', () => {
                const hourglass = Hourglass.createFromDate(2020, 1, 1);
                if (dayOfYearNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(1);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(1);
                }
            });
            it('2020-05-23', () => {
                const hourglass = Hourglass.createFromDate(2020, 5, 23);
                if (dayOfYearNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(144);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(144);
                }
            });
            it('2001-09-30', () => {
                const hourglass = Hourglass.createFromDate(2001, 9, 30);
                if (dayOfYearNames[methodOrPropertyName] === 'method') {
                    expect(hourglass[methodOrPropertyName]()).toBe(273);
                } else {
                    expect(hourglass[methodOrPropertyName]).toBe(273);
                }
            });
        });
    }

    describe('setDayOfYear', () => {
        it('273', () => {
            const hourglass = Hourglass.createFromDate(2001);
            hourglass.setDayOfYear(273);
            expect(hourglass.year).toBe(2001);
            expect(hourglass.month).toBe(9);
            expect(hourglass.day).toBe(30);
        });
        it('144', () => {
            const hourglass = Hourglass.createFromDate(2020);
            hourglass.setDayOfYear(144);
            expect(hourglass.year).toBe(2020);
            expect(hourglass.month).toBe(5);
            expect(hourglass.day).toBe(23);
        });
        it('1', () => {
            const hourglass = Hourglass.createFromDate(2020);
            hourglass.setDayOfYear(1);
            expect(hourglass.year).toBe(2020);
            expect(hourglass.month).toBe(1);
            expect(hourglass.day).toBe(1);
        });
        it('0', () => {
            const hourglass = Hourglass.createFromDate(2020);
            hourglass.setDayOfYear(0);
            expect(hourglass.year).toBe(2019);
            expect(hourglass.month).toBe(12);
            expect(hourglass.day).toBe(31);
        });
    });

    describe('diffInDays', () => {
        it('from 2000-01-01 to 2001-03-02', () => {
            const startHourglass = Hourglass.createFromDate(2000, 1, 1);
            const endHourglass = Hourglass.createFromDate(2000, 3, 2);

            expect(startHourglass.diffInDays(endHourglass)).toBe(61);
        });
        it('from 0678-05-10 to 3000-02-15', () => {
            const startHourglass = Hourglass.createFromDate(678, 5, 10);
            const endHourglass = Hourglass.createFromDate(3000, 2, 15);

            // 73267977600 - надо
            // 73267545600
            console.log('seconds', startHourglass.diffInSeconds(endHourglass));
            expect(startHourglass.diffInDays(endHourglass)).toBe(848009);
        });
    });
});

function compareDay(hourglass, expected) {
    expect(hourglass.day).toBe(expected);
    expect(hourglass.getDay()).toBe(expected);
}
