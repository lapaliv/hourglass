import {Hourglass} from 'src/Hourglass';

Hourglass.prototype = {
    ...Hourglass.prototype,
    clone() {
        return new Hourglass()
            .setYear(this.getYear())
            .setMonth(this.getMonth())
            .setDay(this.getDay())
            .setHours(this.getHours())
            .setMinutes(this.getMinutes())
            .setSeconds(this.getSeconds());
    }
}
