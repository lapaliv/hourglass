import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 0;
const MAX_VALUE = 59;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _second: MIN_VALUE,
    getSecond() {
        return this._second;
    },
    getSeconds() {
        return this.getSecond();
    },
    setSecond(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this._second = value;
        } else {
            this._second = MIN_VALUE;
            this.addSeconds(value);
        }
        return this;
    },
    setSeconds(value) {
        return this.setSecond(value);
    },
    addSecond(count = 1) {
        return this.addSeconds(count);
    },
    addSeconds(count = 1) {
        return addUnit(this, 'second', count, MIN_VALUE, MAX_VALUE, (overflow) => {
            this.addMinutes(overflow);
        });
    },
    subSecond(count = 1) {
        return this.subSeconds(count);
    },
    subSeconds(count = 1) {
        return this.addSeconds(count * -1);
    },
};
