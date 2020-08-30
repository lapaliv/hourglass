import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_MONTH} from 'src/consts';
import {MIN_MONTH} from 'src/consts';
import {countDaysInYear} from 'src/utils/countDaysInYear';

const MIN_VALUE = 0;
const MAX_VALUE = 9999;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _year: MIN_VALUE,
    getYear() {
        return this._year;
    },
    setYear(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this._year = value;
        } else {
            throw new Error('Trying to overflow the year');
        }

        return this;
    },
    addYear(count = 1) {
        return this.addYears(count);
    },
    addYears(count = 1) {
        return addUnit(this, 'year', count, MIN_VALUE, MAX_VALUE, () => {
            throw new Error('Trying to overflow the year');
        });
    },
    subYear(count = 1) {
        return this.subYears(count);
    },
    subYears(count = 1) {
        return this.addYears(count * -1);
    },
    startOfYear() {
        return this.setMonth(MIN_MONTH).startOfMonth();
    },
    endOfYear() {
        return this.setMonth(MAX_MONTH)
            .endOfMonth();
    },
    getDaysInYear() {
        return this.getCountDaysInYear();
    },
    getCountDaysInYear() {
        return countDaysInYear(this.year);
    },
};
