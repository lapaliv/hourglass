import {Hourglass} from 'src/Hourglass';

export function compareDates(date1, date2) {
    date1 = Hourglass.parse(date1);
    date2 = Hourglass.parse(date2);

    const currentIsGreater = date1.gte(date2);

    return {
        greater: currentIsGreater ? date1 : date2,
        lesser: currentIsGreater ? date2 : date1,
    };
}
