import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_HOUR, MIN_HOUR} from 'src/consts';
import {MAX_MINUTE} from 'src/consts';
import {MIN_MINUTE} from 'src/consts';

Hourglass.prototype = {
    ...Hourglass.prototype,
    _hour: MIN_HOUR,
    getHour() {
        return this._hour;
    },
    getHours() {
        return this.getHour();
    },
    setHour(value) {
        if (value >= MIN_HOUR && value <= MAX_HOUR) {
            this._hour = value;
        } else {
            this._hour = MIN_HOUR;
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
        return addUnit(this, 'hour', count, MIN_HOUR, MAX_HOUR, (overflow) => {
            this.addDays(overflow);
        });
    },
    subHour(count = 1) {
        return this.subHours(count);
    },
    subHours(count = 1) {
        return this.addHours(count * -1);
    },
    startOfHour() {
        return this.setMinute(MIN_MINUTE)
            .startOfMinute();
    },
    endOfHour() {
        return this.setMinute(MAX_MINUTE)
            .endOfMinute();
    },
    diffInHours(date) {
        return Math.floor(Hourglass.parse(date).diffInMinutes(this) / 60);
    },
};
