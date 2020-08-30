import {Hourglass} from 'src/Hourglass';
import {MAX_HOUR} from 'src/consts';
import {MIN_HOUR} from 'src/consts';
import {MIN_MONTH} from 'src/consts';
import {countDaysInMonth} from 'src/utils/countDaysInMonth';
import {countDaysInYear} from 'src/utils/countDaysInYear';

const MIN_VALUE = 1;

Hourglass.prototype = {
    ...Hourglass.prototype,
    _day: MIN_VALUE,
    getDay() {
        return this._day;
    },
    setDay(value) {
        if (value >= MIN_VALUE && value <= this.daysInMonth) {
            this._day = value;
        } else {
            const date = this.toDate();
            date.setDate(value);
            this.fromDate(date);
        }

        return this;
    },
    addDay(count = 1) {
        return this.addDays(count);
    },
    addDays(count = 1) {
        const date = this.toDate();
        date.setDate(this.day + count);

        return this.fromDate(date);
    },
    subDay(count = 1) {
        return this.subDays(count);
    },
    subDays(count = 1) {
        return this.addDays(count * -1);
    },
    startOfDay() {
        return this.setHour(MIN_HOUR).startOfHour();
    },
    endOfDay() {
        return this.setHour(MAX_HOUR).endOfHour();
    },
    getDayOfYear() {
        let sum = 0;
        for (let month = MIN_MONTH; month < this.month; month++) {
            sum += countDaysInMonth(this.year, month);
        }

        return sum + this.day;
    },
    setDayOfYear(value) {
        this.startOfYear();
        let coefficient = value < 0 ? -1 : 1;
        const firstValue = value;

        // Определяем количество лет, которое необходимо вычесть/добавить
        let finishYear = this.year;
        for (; ;) {
            const countDaysInCurrentYear = countDaysInYear(finishYear);
            if (Math.abs(value) >= countDaysInCurrentYear) {
                finishYear += coefficient;
                value -= countDaysInCurrentYear;
            } else if (value < 0) {
                finishYear--;
                value += countDaysInCurrentYear - 1;
                coefficient = 1;
            } else {
                break;
            }
        }

        // Определяем кол-во месяцев, которое необходимо вычесть/добавить
        let finishMonth = this.month;
        for (; ;) {
            const countDaysInCurrentMonth = countDaysInMonth(finishYear, finishMonth);
            if (Math.abs(value) > countDaysInCurrentMonth) {
                finishMonth += coefficient;
                value -= countDaysInCurrentMonth;
            } else {
                break;
            }
        }

        this.setYear(finishYear)
            .setMonth(finishMonth)
            .setDay(value);

        return this;
    },
};
