import {describe} from '@jest/globals';
import {expect, it} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('converter', () => {
    it('toDate', () => {
        const hourglass = Hourglass.create(1954, 2, 3, 15, 33, 55);
        const result = hourglass.toDate();
        expect(result.getFullYear()).toBe(1954);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(3);
        expect(result.getHours()).toBe(15);
        expect(result.getMinutes()).toBe(33);
        expect(result.getSeconds()).toBe(55);
    });

    it('toUTCDate', () => {
        const hourglass = Hourglass.create(678, 5, 10, 3, 6, 9);
        const result = hourglass.toUTCDate();
        expect(result.getUTCFullYear()).toBe(678);
        expect(result.getUTCMonth()).toBe(4);
        expect(result.getUTCDate()).toBe(10);
        expect(result.getUTCHours()).toBe(3);
        expect(result.getUTCMinutes()).toBe(6);
        expect(result.getUTCSeconds()).toBe(9);
    });

    it('fromDate', () => {
        const now = new Date();
        const hourglass = new Hourglass(123, 1, 2, 3, 4, 5);
        hourglass.fromDate(now);
        expect(hourglass.year).toBe(now.getFullYear());
        expect(hourglass.month).toBe(now.getMonth() + 1);
        expect(hourglass.day).toBe(now.getDate());
        expect(hourglass.hour).toBe(now.getHours());
        expect(hourglass.minute).toBe(now.getMinutes());
        expect(hourglass.second).toBe(now.getSeconds());
    });

    it('fromDateUTC', () => {
        const now = new Date();
        const hourglass = new Hourglass(123, 1, 2, 3, 4, 5);
        hourglass.fromDate(now);
        expect(hourglass.year).toBe(now.getFullYear());
        expect(hourglass.month).toBe(now.getMonth() + 1);
        expect(hourglass.day).toBe(now.getDate());
        expect(hourglass.hour).toBe(now.getHours());
        expect(hourglass.minute).toBe(now.getMinutes());
        expect(hourglass.second).toBe(now.getSeconds());
    });
});
