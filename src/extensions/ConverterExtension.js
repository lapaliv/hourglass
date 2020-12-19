import {Hourglass} from 'src/Hourglass';
import {startFromZero} from 'src/utils/startFromZero';

Hourglass.prototype = {
    ...Hourglass.prototype,
    toDate() {
        return new Date(
            this.getYear(),
            this.getMonth() - 1,
            this.getDay(),
            this.getHour(),
            this.getMinute(),
            this.getSecond()
        );
    },
    toUTCDate() {
        return new Date(
            Date.UTC(
                this.getYear(),
                this.getMonth() - 1,
                this.getDay(),
                this.getHour(),
                this.getMinute(),
                this.getSecond()
            )
        );
    },

    fromDate(date) {
        return this.setYear(date.getFullYear())
            .setMonth(date.getMonth() + 1)
            .setDay(date.getDate())
            .setHour(date.getHours())
            .setMinute(date.getMinutes())
            .setSecond(date.getSeconds());
    },

    fromDateUTC(date) {
        return this.setYear(date.getUTCFullYear())
            .setMonth(date.getUTCMonth() + 1)
            .setDay(date.getUTCDate())
            .setHour(date.getUTCHours())
            .setMinute(date.getUTCMinutes())
            .setSecond(date.getUTCSeconds());
    },

    toTimestamp() {
        return Math.floor(this.toDate().getTime() / 1000);
    },

    toDateTimeString() {
        let date = [
            this.getYear(),
            startFromZero(this.getMonth()),
            startFromZero(this.getDay()),
        ];
        let time = [
            startFromZero(this.getHour()),
            startFromZero(this.getMinute()),
            startFromZero(this.getSecond()),
        ];


        return date.join('-') + ' ' + time.join(':');
    }
};
