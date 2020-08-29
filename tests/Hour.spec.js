import {describe} from '@jest/globals';
import {it} from '@jest/globals';
import {expect} from '@jest/globals';
import Hourglass from '../dist/hourglass.min';

describe('hour', () => {
    it('get&set', () => {
        const hourglass = Hourglass.createFromTime();
        compareHour(hourglass, 0);

        hourglass.hour = 4;
        compareHour(hourglass, 4);

        hourglass.setHour(25);
        compareHour(hourglass, 1);

        // todo add day checks
    });

    it('add', () => {
        const hourglass = Hourglass.createFromTime();
        compareHour(hourglass, 0);

        hourglass.addHour();
        compareHour(hourglass, 1);

        hourglass.addHour(2);
        compareHour(hourglass, 3);

        hourglass.addHours();
        compareHour(hourglass, 4);

        hourglass.addHours(3);
        compareHour(hourglass, 7);

        hourglass.addHours(30);
        compareHour(hourglass, 13);

        // todo add day checks
    });

    it('sub', () => {
        const hourglass = Hourglass.createFromTime(20);
        compareHour(hourglass, 20);

        hourglass.subHour();
        compareHour(hourglass, 19);

        hourglass.subHour(2);
        compareHour(hourglass, 17);

        hourglass.subHours();
        compareHour(hourglass, 16);

        hourglass.subHours(10);
        compareHour(hourglass, 6);

        hourglass.subHours(7);
        compareHour(hourglass, 23);

        // todo add day checks
    });
});

function compareHour(hourglass, expected) {
    expect(hourglass.hour).toBe(expected);
    expect(hourglass.getHour()).toBe(expected);
    expect(hourglass.getHours()).toBe(expected);
}
