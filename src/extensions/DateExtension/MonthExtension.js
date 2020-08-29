import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 1;
const MAX_VALUE = 12;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _month: MIN_VALUE,
    getMonth() {
        return this._month;
    },
    setMonth(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this._month = value;
        } else {
            this._month = MIN_VALUE;
            this.addMonths(value);
        }
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
