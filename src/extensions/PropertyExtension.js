import {Hourglass} from 'src/Hourglass';
import {isLeapYear} from 'src/utils/isLeapYear';

Hourglass.prototype = {
    ...Hourglass.prototype,
    get year() {
        return this.getYear();
    },
    set year(value) {
        this.setYear(value);
    },
    get month() {
        return this.getMonth();
    },
    set month(value) {
        this.setMonth(value);
    },
    get day() {
        return this.getDay();
    },
    set day(value) {
        this.setDay(value);
    },
    get hour() {
        return this.getHour();
    },
    set hour(value) {
        this.setHour(value);
    },
    get minute() {
        return this.getMinute();
    },
    set minute(value) {
        this.setMinute(value);
    },
    get second() {
        return this.getSecond();
    },
    set second(value) {
        this.setSecond(value);
    },
    get daysInMonth() {
        return this.getCountDaysInMonth();
    },
    get countDaysInMonth() {
        return this.getCountDaysInMonth();
    },
    get isLeapYear() {
        return isLeapYear(this.year);
    },
    get dayOfYear() {
        return this.getDayOfYear();
    },
    get daysInYear() {
        return this.getCountDaysInYear();
    },
    get countDaysInYear() {
        return this.getCountDaysInYear();
    },
};
