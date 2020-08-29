import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 0;
const MAX_VALUE = 23;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _hour: MIN_VALUE,
    getHour() {
        return this._hour;
    },
    getHours() {
        return this.getHour();
    },
    setHour(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this._hour = value;
        } else {
            this._hour = MIN_VALUE;
            this.addHours(value);
        }
        return this;
    },
    setHours(value) {
        return this.setHour(value);
    },
    addHour(count = 1) {
        return this.addHours(count);
    },
    addHours(count = 1) {
        return addUnit(this, 'hour', count, MIN_VALUE, MAX_VALUE, (overflow) => {
            this.addDays(overflow);
        });
    },
    subHour(count = 1) {
        return this.subHours(count);
    },
    subHours(count = 1) {
        return this.addHours(count * -1);
    },
};
