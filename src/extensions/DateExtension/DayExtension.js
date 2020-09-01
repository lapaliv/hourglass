import {Hourglass} from 'src/Hourglass';
import {MAX_HOUR} from 'src/consts';
import {MIN_HOUR} from 'src/consts';
import {MIN_MONTH} from 'src/consts';
import {countDaysInMonth} from 'src/utils/countDaysInMonth';

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
            const date = this.toDate();
            date.setDate(value);
            this.fromDate(date);
        }

        return this;
    },
    addDay(count = 1) {
        return this.addDays(count);
    },
    addDays(count = 1) {
        const date = this.toDate();
        date.setDate(this.day + count);

        return this.fromDate(date);
    },
    subDay(count = 1) {
        return this.subDays(count);
    },
    subDays(count = 1) {
        return this.addDays(count * -1);
    },
    startOfDay() {
        return this.setHour(MIN_HOUR).startOfHour();
    },
    endOfDay() {
        return this.setHour(MAX_HOUR).endOfHour();
    },
    getDayOfYear() {
        let sum = 0;
        for (let month = MIN_MONTH; month < this.month; month++) {
            sum += countDaysInMonth(this.year, month);
        }

        return sum + this.day;
    },
    setDayOfYear(value) {
        return this.startOfYear().setDay(value);
    },
};
