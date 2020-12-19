import {Hourglass} from 'src/Hourglass';
import {compareDates} from './utils/compareDates';
import {MAX_MONTH} from 'src/consts';
import {MAX_HOUR} from 'src/consts';
import {MAX_MINUTE} from 'src/consts';
import {MAX_SECOND} from 'src/consts';
import {isLeapYear} from 'src/utils/isLeapYear';

export class HourglassDiff {
    years = 0;
    months = 0;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    constructor(start, end) {
        const compares = compareDates(Hourglass.parse(start), Hourglass.parse(end));

        this._greater = compares.greater;
        this._lesser = compares.lesser;

        this._computeYears();
        this._computeMonths();
        this._computeDays();
        this._computeHours();
        this._computeMinutes();
        this._computeSeconds();
    }

    _computeYears() {
        this.years = this._greater.getYear() - this._lesser.getYear();

        if (this._compareUnits() > 0) {
            this.years--;
        }

        //const compareOtherUnits = this._compareUnits();
        //
        //if (compareOtherUnits === 1) {
        //    this.years--;
        //}
    }

    _computeMonths() {
        if (this._compareUnits() <= 0) {
            this.months = this._greater.getMonth() - this._lesser.getMonth();
        } else {
            this.months = MAX_MONTH - this._lesser.getMonth() + this._greater.getMonth();
        }

        if (this._compareUnits('day') > 0) {
            this.months--;
        }

        //if (this._greater.getMonth() >= this._lesser.getMonth()) {
        //    this._setMonths(this._greater.getMonth() - this._lesser.getMonth());
        //} else if (this._greater.getMonth() < this._lesser.getMonth()) {
        //    this.years--;
        //    this._setMonths(MAX_MONTH - this._lesser.getMonth() + this._greater.getMonth());
        //}

        //this.months = this._greater.getMonth() >= this._lesser.getMonth()
        //    ? this._greater.getMonth() - this._lesser.getMonth()
        //    : MAX_MONTH - this._lesser.getMonth() + this._greater.getMonth();
        //
        //const compareOtherUnits = this._compareUnits(1);
        //
        //if (compareOtherUnits === 1) {
        //    this._setMonths(this.months - 1);
        //}
    }

    _computeDays() {
        if (this._compareUnits('day') <= 0) {
            this.days = this._greater.getDay() - this._lesser.getDay();
        } else {
            this.days = this._lesser.getDaysInMonth() - this._lesser.getDay() + this._greater.getDay();
            //this.days = this._lesser.getDaysInMonth() - this._lesser.getDay() + this._greater.getDay();
            //const hourlgass = this._greater.clone().setDay(this._lesser.getDay()).subMonth();
            //console.log('hourglass', hourlgass);
            //this.days = hourlgass.getDaysInMonth() - hourlgass.getDay() + this._greater.getDay();
        }

        if (this._compareUnits('hours') > 0) {
            this.days--;
        }
        //if (this._greater.getDay() >= this._lesser.getDay()) {
        //    this._setDays(this._greater.getDay() - this._lesser.getDay());
        //} else {
        //    this._setMonths(this.months - 1);
        //    this._setDays(this._lesser.getDaysInMonth() - this._lesser.getDay() + this._greater.getDay());
        //}

        //this.days = this._greater.getDay() >= this._lesser.getDay()
        //    ? this._greater.getDay() - this._lesser.getDay()
        //    : this._lesser.getDaysInMonth() - this._lesser.getDay() + this._greater.getDay();
        //
        //const compareOtherUnits = this._compareUnits(2);
        //
        //if (compareOtherUnits === 1) {
        //    this._setDays(this.days - 1);
        //}
    }

    _computeHours() {
        if (this._compareUnits('hours') <= 0) {
            this.hours = this._greater.getHours() - this._lesser.getHours();
        } else {
            this.hours = (MAX_HOUR + 1) - this._lesser.getHours() + this._greater.getHours();
        }

        if (this._compareUnits('minutes') > 0) {
            this.hours--;
        }

        //if (this._greater.getHours() >= this._lesser.getHours()) {
        //    this._setHours(this._greater.getHours() - this._lesser.getHours());
        //} else {
        //    console.log('compute hours', {
        //        days: this.days,
        //        lesserHours: this._lesser.getHours(),
        //        greaterHours: this._greater.getHours(),
        //    });
        //    this._setDays(this.days - 1);
        //    this._setHours((MAX_HOUR + 1) - this._lesser.getHours() + this._greater.getHours());
        //}

        //this.hours = this._greater.getHours() >= this._lesser.getHours()
        //    ? this._greater.getHours() - this._lesser.getHours()
        //    : (MAX_HOUR + 1) - this._lesser.getHours() + this._greater.getHours();
        //
        //const compareOtherUnits = this._compareUnits(3);
        //
        //if (compareOtherUnits === 1) {
        //    this._setHours(this.hours - 1);
        //}
    }

    _computeMinutes() {
        if (this._compareUnits('minutes') <= 0) {
            this.minutes = this._greater.getMinutes() - this._lesser.getMinutes();
        } else {
            this.minutes = (MAX_MINUTE + 1) - this._lesser.getMinutes() + this._greater.getMinutes();
        }

        if (this._compareUnits('seconds') > 0) {
            this.minutes--;
        }

        //if (this._greater.getMinutes() >= this._lesser.getMinutes()) {
        //    this._setMinutes(this._greater.getMinutes() - this._lesser.getMinutes());
        //} else {
        //    this._setHours(this.hours - 1);
        //    this._setMinutes((MAX_MINUTE + 1) - this._lesser.getMinutes() + this._greater.getMinutes());
        //}

        //this.minutes = this._greater.getMinutes() >= this._lesser.getMinutes()
        //    ? this._greater.getMinutes() - this._lesser.getMinutes()
        //    : (MAX_HOUR + 1) - this._lesser.getMinutes() + this._greater.getMinutes();
        //
        //const compareOtherUnits = this._compareUnits(4);
        //
        //if (compareOtherUnits === 1) {
        //    this._setMinutes(this.minutes - 1);
        //}
    }

    _computeSeconds() {
        if (this._greater.getSeconds() >= this._lesser.getSeconds()) {
            this._setSeconds(this._greater.getSeconds() - this._lesser.getSeconds());
        } else {
            this._setSeconds((MAX_SECOND + 1) - this._lesser.getSeconds() + this._greater.getSeconds());
        }

        //if (this._greater.getSeconds() >= this._lesser.getSeconds()) {
        //    this._setSeconds(this._greater.getSeconds() - this._lesser.getSeconds());
        //} else {
        //    this._setMinutes(this.minutes - 1);
        //    this._setSeconds((MAX_SECOND + 1) - this._lesser.getSeconds() + this._greater.getSeconds());
        //}

        //this.seconds = this._greater.getSeconds() >= this._lesser.getSeconds()
        //    ? this._greater.getSeconds() - this._lesser.getSeconds()
        //    : (MAX_HOUR + 1) - this._lesser.getSeconds() + this._greater.getSeconds();
        //
        //const compareOtherUnits = this._compareUnits(5);
        //
        //if (compareOtherUnits === 1) {
        //    this._setSeconds(this.seconds - 1);
        //}
    }

    /**
     * Сравнивает значения у greater и у lesser.
     * Если greater больше, возвращается -1. Если меньше - 1. Если равны - 0
     * @param startFrom
     * @returns {number}
     * @private
     */
    _compareUnits(startFrom = null) {
        const units = ['month', 'day', 'hours', 'minutes', 'seconds'];
        let wasStarted = startFrom === null;

        for (const unit of units) {
            if (!wasStarted && unit !== startFrom) {
                continue;
            }

            wasStarted = true;

            const method = 'get' + unit.substr(0, 1).toUpperCase() + unit.substr(1);
            const greaterValue = this._greater[method]();
            const lesserValue = this._lesser[method]();

            if (greaterValue > lesserValue) {
                return -1;
            }

            if (greaterValue < lesserValue) {
                return 1;
            }
        }

        return 0;
    }

    _setMonths(months) {
        if (months < 0) {
            this.years--;
            this.months = MAX_MONTH + months;
        } else {
            this.months = months;
        }
    }

    _setDays(days) {
        if (days < 0) {
            this._setMonths(this.months - 1);
            const hourlgass = Hourglass.create(
                this._greater.getYear(),
                this._greater.getMonth(),
                this._lesser.getDay(),
                this._greater.getHours(),
                this._greater.getMinutes(),
                this._greater.getSeconds(),
            );
            console.log('diffInDays', hourlgass, hourlgass.subMonth().diffInDays(this._greater), days);
            // this._greater.clone().subMonth().diffInDays(this._greater)
            this.days = hourlgass.subMonth().diffInDays(this._greater) + days;
        } else {
            this.days = days;
        }
    }

    _setHours(hours) {
        if (hours < 0) {
            console.log('set hours', this.hours, '=', hours, this.days);
            this._setDays(this.days - 1);
            this.hours = (MAX_HOUR + 1) + hours;
        } else {
            this.hours = hours;
        }
    }

    _setMinutes(minutes) {
        if (minutes < 0) {
            this._setHours(this.hours - 1);
            this.minutes = (MAX_MINUTE + 1) + minutes;
        } else {
            this.minutes = minutes;
        }
    }

    _setSeconds(seconds) {
        if (seconds < 0) {
            this._setMinutes(this.minutes - 1);
            this.seconds = (MAX_SECOND + 1) + seconds;
        } else {
            this.seconds = seconds;
        }
    }
}
