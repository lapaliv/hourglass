import {Hourglass} from 'src/Hourglass';

const MIN_VALUE = 1;
let day = MIN_VALUE;

Hourglass.prototype = {
    ...Hourglass.prototype,
    get day() {
        return day;
    },
    set day(value) {
        if (value >= MIN_VALUE && value <= this.daysInMonth) {
            day = value;
        } else {
            day = 1;
            this.add(value);
        }

        return this;
    },
    getDay() {
        return this.day;
    },
    setDay(value) {
        this.day = value;
        return this;
    },
    addDay(count = 1) {
        return this.addDays(count);
    },
    addDays(count = 1) {
        while (true) {
            const countDaysInMonth = this.daysInMonth;

            if (countDaysInMonth < count) {
                day += count;
                break;
            } else {
                count -= countDaysInMonth;
                this.addMonth();
            }
        }

        return this;
    },
    subDay(count = 1) {
        return this.subDays(count);
    },
    subDays(count = 1) {
        return this.addDays(count * -1);
    },
};
