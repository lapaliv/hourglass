import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_MONTH, MIN_MONTH} from 'src/consts';
import {MIN_DAY} from 'src/consts';
import {countDaysInMonth} from 'src/utils/countDaysInMonth';

Hourglass.prototype = {
    ...Hourglass.prototype,
    _month: MIN_MONTH,
    getMonth() {
        return this._month;
    },
    setMonth(value) {
        if (value >= MIN_MONTH && value <= MAX_MONTH) {
            this._month = value;
        } else {
            this._month = MIN_MONTH;
            this.addMonths(value);
        }
        return this;
    },
    addMonth(count = 1) {
        return this.addMonths(count);
    },
    addMonths(count = 1) {
        return addUnit(this, 'month', count, MIN_MONTH, MAX_MONTH, (overflow) => {
            this.addYears(overflow);
        });
    },
    subMonth(count = 1) {
        return this.subMonths(count);
    },
    subMonths(count = 1) {
        return this.addMonths(count * -1);
    },
    startOfMonth() {
        return this.setDay(MIN_DAY).startOfDay();
    },
    endOfMonth() {
        return this.setDay(this.daysInMonth)
            .endOfDay();
    },
    getCountDaysInMonth() {
        return countDaysInMonth(this.year, this.month);
    },
};
