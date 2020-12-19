import {addUnit} from 'src/utils/addUnit';
import {MAX_MONTH} from 'src/consts';
import {MIN_HOUR} from 'src/consts';
import {MAX_HOUR} from 'src/consts';
import {MIN_MINUTE} from 'src/consts';
import {MAX_MINUTE} from 'src/consts';
import {MIN_SECOND} from 'src/consts';
import {MAX_SECOND} from 'src/consts';

export class Difference {
    years = 0;
    months = 0;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    addYears(count = 1) {
        this.years += count;
        return this;
    }

    addMonths(count = 1) {
        return addUnit(this, 'months', count, 0, MAX_MONTH, (overflow) => {
            this.addYears(overflow);
        });
    }

    addDays(count = 1) {
        return addUnit(this, 'days', count, 0, 30, (overflow) => {
            this.addMonths(overflow);
        });
    }

    addHours(count = 1) {
        return addUnit(this, 'hours', count, MIN_HOUR, MAX_HOUR, (overflow) => {
            this.addDays(overflow);
        });
    }

    addMinutes(count = 1) {
        return addUnit(this, 'minutes', count, MIN_MINUTE, MAX_MINUTE, (overflow) => {
            this.addHours(overflow);
        });
    }

    addSeconds(count = 1) {
        return addUnit(this, 'seconds', count, MIN_SECOND, MAX_SECOND, (overflow) => {
            this.addMinutes(overflow);
        });
    }

}
