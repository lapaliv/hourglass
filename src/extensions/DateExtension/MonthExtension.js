import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 1;
const MAX_VALUE = 12;
let month = MIN_VALUE;

Hourglass.prototype = {
    ...Hourglass.prototype,
    get month() {
        return month;
    },
    set month(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            month = value;
        } else {
            month = MIN_VALUE;
            this.add(value);
        }
    },
    get daysInMonth() {
        const countDaysInMonths = [31, this.isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return countDaysInMonths[this.month - 1];
    },
    getMonth() {
        return this.month;
    },
    setMonth(value) {
        this.month = value;
        return this;
    },
    addMonth(count = 1) {
        return this.addMonths(count);
    },
    addMonths(count = 1) {
        return addUnit(this, 'month', count, MIN_VALUE, MAX_VALUE, (overflow) => {
            this.addYears(overflow);
        });
    },
    subMonth(count = 1) {
        return this.subMonths(count);
    },
    subMonths(count = 1) {
        return this.addMonths(count * -1);
    },
};
