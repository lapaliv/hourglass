import {Hourglass} from 'src/Hourglass';
import {MAX_HOUR} from 'src/consts';
import {MIN_HOUR} from 'src/consts';
import {MIN_MONTH} from 'src/consts';
import {MIN_DAY} from 'src/consts';
import {MAX_MONTH} from 'src/consts';
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
            this._day = MIN_DAY;
            this.addDays(value - MIN_DAY);
        }

        return this;
    },
    addDay(count = 1) {
        return this.addDays(count);
    },
    addDays(count = 1) {
        if (count >= 0) {
            while (this.dayOfYear + count >= this.daysInYear) {
                count -= this.daysInYear - this.dayOfYear + 1;
                this.addYear();
                this.month = MIN_MONTH;
                this.day = MIN_DAY;
            }

            while (this.day + count >= this.daysInMonth) {
                count -= this.daysInMonth - this.day + 1;
                this.addMonth();
                this.day = MIN_DAY;
            }
        } else {
            while (this.dayOfYear + count <= 0) {
                count += this.dayOfYear;
                this.subYear();
                this.month = MAX_MONTH;
                this.day = this.daysInMonth;
            }

            while (this.day + count <= 0) {
                count += this.day;
                this.subMonth();
                this.day = this.daysInMonth;
            }
        }

        this.day += count;

        return this;
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
    diffInDays(date) {
        return Math.floor(Hourglass.parse(date).diffInHours(this) / 24);
    },
};
