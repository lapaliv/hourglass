import {countDaysInMonth} from 'src/utils/countDaysInMonth';
import {isLeapYear} from 'src/utils/isLeapYear';

export function countSeconds(hourglass) {
    let days = hourglass.year * 365
        // Включаем дни из високостных годов
        + Math.floor(hourglass.year / 4)
        - Math.floor(hourglass.year / 100)
        + Math.floor(hourglass.year / 400);

    if (isLeapYear(hourglass.year) && (hourglass.month > 2 || (hourglass.month === 2 && hourglass.days >= 29))) {
        days++;
    }

    for (let month = 1; month < hourglass.month; month++) {
        days += countDaysInMonth(hourglass.year, month);
    }

    return ((days * 24 + hourglass.hour) * 60 + hourglass.minute) * 60 + hourglass.second;
}
