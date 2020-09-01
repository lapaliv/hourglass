import {isLeapYear} from 'src/utils/isLeapYear';

export function countDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
