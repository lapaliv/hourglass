import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_MONTH, MIN_MONTH} from 'src/consts';
import {MIN_DAY} from 'src/consts';
import {FIELDS_FOR_COMPARE} from 'src/consts';
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
            this.addMonths(value - MIN_MONTH);
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
    getDaysInMonth() {
        return this.getCountDaysInMonth();
    },
    getCountDaysInMonth() {
        return countDaysInMonth(this.year, this.month);
    },
    diffInMonths(date) {
        const hourglass = Hourglass.parse(date);
        const fieldsForCompare = ['day', 'hour', 'minute', 'second'];

        let greaterDate = null;
        let lesserDate = null;

        if (this.gte(hourglass)) {
            greaterDate = this;
            lesserDate = hourglass;
        } else {
            greaterDate = hourglass;
            lesserDate = this;
        }

        let diff = (greaterDate.year - lesserDate.year) * 12 - lesserDate.month + greaterDate.month;

        for (const field of fieldsForCompare) {
            if (greaterDate[field] < lesserDate[field]) {
                return diff - 1;
            }
        }

        return diff;
    },
};
