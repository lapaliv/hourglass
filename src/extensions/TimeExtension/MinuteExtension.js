import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 0;
const MAX_VALUE = 59;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _minute: MIN_VALUE,
    getMinute() {
        return this._minute;
    },
    getMinutes() {
        return this.getMinute();
    },
    setMinute(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this._minute = value;
        } else {
            this._minute = MIN_VALUE;
            this.addMinutes(value);
        }
        return this;
    },
    setMinutes(value) {
        return this.setMinute(value);
    },
    addMinute(count = 1) {
        return this.addMinutes(count);
    },
    addMinutes(count = 1) {
        return addUnit(this, 'minute', count, MIN_VALUE, MAX_VALUE, (overflow) => {
            this.addHours(overflow);
        });
    },
    subMinute(count = 1) {
        return this.subMinutes(count);
    },
    subMinutes(count = 1) {
        return this.addMinutes(count * -1);
    },
};
