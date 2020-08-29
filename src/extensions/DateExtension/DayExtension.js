import {Hourglass} from 'src/Hourglass';

const MIN_VALUE = 1;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _day: MIN_VALUE,
    getDay() {
        return this._day;
    },
    setDay(value) {
        if (value >= MIN_VALUE && value <= this.daysInMonth) {
            this._day = value;
        } else {
            this._day = 1;
            this.addDays(value);
        }

        return this;
    },
    addDay(count = 1) {
        return this.addDays(count);
    },
    addDays(count = 1) {
        while (true) {
            const countDaysInMonth = this.daysInMonth;

            if (count + this.day < countDaysInMonth) {
                this.day += count;
                break;
            } else {
                count -= countDaysInMonth;
                this.addMonth();
                this.day = MIN_VALUE;
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
