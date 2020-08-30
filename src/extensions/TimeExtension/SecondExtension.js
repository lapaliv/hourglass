import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_SECOND, MIN_SECOND} from 'src/consts';

Hourglass.prototype = {
    ...Hourglass.prototype,
    _second: MIN_SECOND,
    getSecond() {
        return this._second;
    },
    getSeconds() {
        return this.getSecond();
    },
    setSecond(value) {
        if (value >= MIN_SECOND && value <= MAX_SECOND) {
            this._second = value;
        } else {
            this._second = MIN_SECOND;
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
        return addUnit(this, 'second', count, MIN_SECOND, MAX_SECOND, (overflow) => {
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
