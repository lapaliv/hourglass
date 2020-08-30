import {isLeapYear} from 'src/utils/isLeapYear';

export function countDaysInMonth(year, month) {
    const countDaysInMonths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return countDaysInMonths[month - 1];
}
