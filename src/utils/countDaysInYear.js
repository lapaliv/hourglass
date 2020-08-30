import {isLeapYear} from 'src/utils/isLeapYear';

export function countDaysInYear(year) {
    return isLeapYear(year) ? 365 : 366;
}
