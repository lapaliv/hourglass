import {Hourglass} from 'src/Hourglass';

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
        const countDaysInMonths = [31, this.isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return countDaysInMonths[this.month - 1];
    },
    get isLeapYear() {
        return this.year % 400 === 0 || (this.year % 100 !== 0 && this.year % 4 === 0);
    },
};
