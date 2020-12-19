import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';
import {MAX_MINUTE, MIN_MINUTE} from 'src/consts';
import {MAX_SECOND} from 'src/consts';
import {MIN_SECOND} from 'src/consts';

Hourglass.prototype = {
    ...Hourglass.prototype,
    _minute: MIN_MINUTE,
    getMinute() {
        return this._minute;
    },
    getMinutes() {
        return this.getMinute();
    },
    setMinute(value) {
        if (value >= MIN_MINUTE && value <= MAX_MINUTE) {
            this._minute = value;
        } else {
            this._minute = MIN_MINUTE;
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
        return addUnit(this, 'minute', count, MIN_MINUTE, MAX_MINUTE, (overflow) => {
            this.addHours(overflow);
        });
    },
    subMinute(count = 1) {
        return this.subMinutes(count);
    },
    subMinutes(count = 1) {
        return this.addMinutes(count * -1);
    },
    startOfMinute() {
        this.setSecond(MIN_SECOND);
        return this;
    },
    endOfMinute() {
        this.setSecond(MAX_SECOND);
        return this;
    },
    diffInMinutes(date) {
        return Math.floor(Hourglass.parse(date).diffInSeconds(this) / 60);
    },

    _gteMinuteForDiff(h1, h2) {
        return h1.getMinutes() >= h2.getMinutes()
            && this._gteSecondForDiff(h1, h2);
    },
};
