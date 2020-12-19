import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_YEAR, MIN_YEAR, MAX_MONTH, MIN_MONTH} from 'src/consts';
import {countDaysInYear} from 'src/utils/countDaysInYear';

Hourglass.prototype = {
    ...Hourglass.prototype,
    _year: MIN_YEAR,
    getYear() {
        return this._year;
    },
    setYear(value) {
        if (value >= MIN_YEAR && value <= MAX_YEAR) {
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
        return addUnit(this, 'year', count, MIN_YEAR, MAX_YEAR, () => {
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
    diffInYears(date) {
        const hourglass = Hourglass.parse(date);
        const diff = Math.abs(this.getYear() - hourglass.getYear());
        const fieldsForCompare = ['month', 'day', 'hour', 'minute', 'second'];

        let greaterDate = null;
        let lesserDate = null;

        if (this.gte(hourglass)) {
            greaterDate = this;
            lesserDate = hourglass;
        } else {
            greaterDate = hourglass;
            lesserDate = this;
        }

        for (const field of fieldsForCompare) {
            if (greaterDate[field] < lesserDate[field]) {
                return diff - 1;
            }
        }

        return diff;
    },
};
