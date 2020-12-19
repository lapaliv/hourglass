import {Hourglass} from 'src/Hourglass';
import {FIELDS_FOR_COMPARE} from 'src/consts';
import {MAX_MONTH} from 'src/consts';
import {MAX_HOUR} from 'src/consts';
import {MAX_MINUTE} from 'src/consts';
import {MAX_SECOND} from 'src/consts';
import {MIN_SECOND} from 'src/consts';
import {MIN_MINUTE} from 'src/consts';
import {MIN_HOUR} from 'src/consts';
import {MIN_MONTH} from 'src/consts';
import {MIN_DAY} from 'src/consts';
import {countDaysInMonth} from 'src/utils/countDaysInMonth';
import {Difference} from 'src/components/Difference';

Hourglass.prototype = {
    ...Hourglass.prototype,
    gte(date) {
        const hourglass = Hourglass.parse(date);

        for (const field of FIELDS_FOR_COMPARE) {
            if (this[field] > hourglass[field]) {
                return true;
            } else if (this[field] < hourglass[field]) {
                return false;
            }
        }

        return true;
    },
    diff(date) {
        const hourglass = Hourglass.parse(date);
        const difference = new Difference();

        const currentIsGreater = this.gte(hourglass);
        const greater = currentIsGreater ? this : hourglass;
        const lesser = currentIsGreater ? hourglass : this;

        if (greater.year !== lesser.year) {
            difference.addYears(greater.year - lesser.year - 1)
                .addMonths(
                    lesser.month < greater.month
                        ? greater.month - lesser.month - 1
                        : MAX_MONTH - lesser.month + greater.month - 1
                )
                .addDays(countDaysInMonth(lesser.year, lesser.month) - lesser.day + greater.day - 1)
                .addHours(MAX_HOUR - lesser.hour + greater.hour)
                .addMinutes(MAX_MINUTE - lesser.minute + greater.minute)
                .addSeconds(MAX_SECOND - lesser.second + greater.second + 1);

            if (greater.month > lesser.month) {
                difference.addYears();
            } else if (greater.month === lesser.month) {
                if (greater.day > lesser.day) {
                    difference.addYears();
                    difference.addMonths();
                } else if (greater.day === lesser.day) {
                    if (greater.hour > lesser.hour) {
                        difference.addYears();
                        difference.addMonths();
                        difference.addDays();
                    } else if (greater.hour === lesser.hour) {
                        if (greater.minute > lesser.minute) {
                            difference.addYears();
                            difference.addMonths();
                            difference.addDays();
                            difference.addHours();
                        }
                        greater.minute >= lesser.minute && greater.second >= lesser.second;
                    }
                }
            }
        } else {
            if (greater.month !== lesser.month) {
                difference.addMonths(greater.month - lesser.month);
            }

            difference.addSeconds(MAX_SECOND + 1 - lesser.second)
                .addMinutes(MAX_MINUTE - lesser.minute)
                .addHours(MAX_HOUR - lesser.hour);

            lesser.setSecond(MIN_SECOND)
                .setMinute(MIN_MINUTE)
                .setHour(MIN_HOUR)
                .addDay();

            difference.addSeconds(greater.second)
                .addMinutes(greater.minute)
                .addHours(greater.hour);

            greater.setSecond(MIN_SECOND)
                .setMinute(MIN_MINUTE)
                .setHour(MIN_HOUR);

            if (greater.day !== lesser.day) {
                difference.addDays(greater.day - lesser.day);
            }
        }

        //const result = Hourglass.create(0, 1, 1, 0, 0, 0);
        //if (greater.year !== lesser.year) {
        //    // Вычисляем разницу до начала след года у lesser и до начала года у greater
        //    result.setYear(greater.year - lesser.year - 1);
        //    result.setMonth(
        //        lesser.month < greater.month
        //            ? greater.month - lesser.month - 1
        //            : MAX_MONTH - lesser.month + greater.month - 1
        //    );
        //    result.setDay(countDaysInMonth(lesser.year, lesser.month) - lesser.day + greater.day - 1);
        //    result.addHours(MAX_HOUR - lesser.hour + greater.hour);
        //    result.addMinutes(MAX_MINUTE - lesser.minute + greater.minute);
        //    result.addSeconds(MAX_SECOND - lesser.second + greater.second + 1);
        //
        //    if (greater.month > lesser.month) {
        //        result.addYear();
        //    } else if (greater.month === lesser.month) {
        //        if (greater.day > lesser.day) {
        //            result.addYear();
        //            result.addMonth();
        //        } else if (greater.day === lesser.day) {
        //            if (greater.hour >= lesser.hour && greater.minute >= lesser.minute && greater.second >= lesser.second) {
        //                result.addYear();
        //                result.addMonth();
        //                result.addDay();
        //            }
        //        }
        //    }
        //} else if (greater.month !== lesser.month) {
        //    // todo
        //} else if (greater.day !== lesser.day) {
        //
        //}
        //return {
        //    years: result.year,
        //    months: result.month,
        //    days: result.day,
        //    hours: result.hour,
        //    minutes: result.minute,
        //    seconds: result.second,
        //};

        // Если года не равны
        //      1.
        // 1. Если год и месяц совпадает, а день нет - Приводим lesser к следующему дню
        // 2. Приводим greater к началу дню
        // 3. Приводим

        //const gtes = {
        //    month: false,
        //    day: false,
        //    hour: false,
        //    minute: false,
        //    second: false,
        //};

        //const result = {
        //    years: Math.abs(greater.year - lesser.year),
        //    months: lesser.year !== greater.year
        //        ? MAX_MONTH + 1 - lesser.month + greater.month
        //        : greater.month - lesser.month,
        //    days: lesser.month !== greater.month
        //        ? countDaysInMonth(lesser.year, lesser.month) - lesser.day + greater.day
        //        : greater.day - lesser.day - 1,
        //    hours: MAX_HOUR + 1 - lesser.hour + greater.hour,
        //    minutes: MAX_MINUTE + 1 - lesser.minute + greater.minute,
        //    seconds: MAX_SECOND + 1 - lesser.second + greater.second,
        //};


        return {
            years: difference.years,
            months: difference.months,
            days: difference.days,
            hours: difference.hours,
            minutes: difference.minutes,
            seconds: difference.seconds,
        };


        // Сначала определяем разницу во времени. Определяем бОльшую дату. Из нее вычитаем меньшую

        // Пример:
        // (1) 2020-01-01 23:59:59 - меньшая
        // (2) 2020-01-02 00:02:05 - большая
        // Считаем: (1) -1 секунда (относительно 2020-01-02 00:00:00) , (2) 2 мин 5 сек
        // Суммируем: 2 мин 6 сек

        // Второй пример:
        // 2020-01-02 00:02:05 - 2020-01-02 01:05:05
        // (1) -57 мин 55 секунд (относительно 2020-01-02 01:00:00)
        // (2) 5 мин 5 секунд
        // Суммируем: 1 час 3 мин

        // 3 пример:
        // 2020-01-02 00:02:05 - 2020-01-02 01:05:05
        // (1) -57 мин 55 секунд (относительно 2020-01-02 01:00:00)
        // (2) 5 мин 5 секунд
        // Суммируем: 1 час 3 мин

        // 00:00:00 - 00:00:35
        // 00:01:00 - 00:02:35
        // 23:59:59 - 00:02:05

        //let greaterDate = null;
        //let lesserDate = null;
        //
        //if (this.gte(hourglass)) {
        //    greaterDate = this;
        //    lesserDate = hourglass;
        //} else {
        //    greaterDate = hourglass;
        //    lesserDate = this;
        //}
        //
        //for (const field of fieldsForCompare) {
        //    const diff = greaterDate[field] - lesserDate[field];
        //
        //    result[field] = greaterDate[field] < lesserDate[field] ? diff - 1 : diff;
        //}

        return result;
    },
    diff2(date) {
        const hourglass = Hourglass.parse(date);
        const difference = new Difference();
        const currentIsGreater = this.gte(hourglass);
        const greater = currentIsGreater ? this : hourglass;
        const lesser = currentIsGreater ? hourglass : this;
        //const fields = ['year', 'month', 'day', 'hour', 'minute', 'second'];
        const fields = {
            year: {
                method: 'addYears',
            },
            month: {
                min: MIN_MONTH,
                max: MAX_MONTH,
                method: 'addMonths',
            },
            day: {
                min: MIN_DAY,
                method: 'addDays',
            },
            hour: {
                min: MIN_HOUR,
                max: MAX_HOUR,
                method: 'addHours',
            },
            minute: {
                min: MIN_MINUTE,
                max: MAX_MINUTE,
                method: 'addMinutes',
            },
            second: {
                min: MIN_MINUTE,
                max: MAX_MINUTE,
                method: 'addSeconds',
            },
        };

        for (const field in fields) {
            let count = 0;

            if (greater[field] <= lesser[field]) {
                count = fields[field].max - lesser[field] + greater[field];
            } else {
                count = greater[field] - lesser[field];
            }

            let findCurrentField = false;
            for (const nextField in fields) {
                if (!findCurrentField) {
                    findCurrentField = findCurrentField || nextField === field;
                    continue;
                }

                if (greater[nextField] < lesser[nextField]) {
                    //if (greater[field] - 1 === lesser[field]) {
                        count--;
                    //}
                    break;
                } else if (greater[nextField] > lesser[nextField]) {
                    break;
                }
            }

            difference[fields[field].method](count);
        }

        return difference;
    }
};
