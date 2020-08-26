import {Hourglass} from 'src/Hourglass';
import {addUnit} from 'src/utils/addUnit';

const MIN_VALUE = 0;
const MAX_VALUE = 9999;
let year = MIN_VALUE;

Hourglass.prototype = {
    ...Hourglass.prototype,
    get year() {

    },
    set year(value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            year = value;
        } else {
            throw new Error('Trying to overflow the year');
        }
    },
    get isLeap() {
        // todo
    },
    getYear() {
        return this.year;
    },
    setYear(value) {
        this.year = value;
        return this;
    },
    addYear(count = 1) {
        return this.addYears(count);
    },
    addYears(count = 1) {
        return addUnit(this, 'year', count, MIN_VALUE, MAX_VALUE, () => {
            throw new Error('Trying to overflow the year');
        });
    },
    subYear(count = 1) {
        return this.subYears(count);
    },
    subYears(count = 1) {
        return this.addYears(count * -1);
    },
};
