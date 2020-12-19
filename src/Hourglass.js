export class Hourglass {
    static createFromTime(hour = 0, minute = 0, second = 0) {
        return new Hourglass()
            .setHour(hour)
            .setMinute(minute)
            .setSecond(second);
    }

    static createFromDate(year, month = 1, day = 1) {
        return new Hourglass()
            .setYear(year)
            .setMonth(month)
            .setDay(day)
            .setHour(0)
            .setMinute(0)
            .setSecond(0);
    }

    static create(year, month, day, hour, minute, second) {
        return new Hourglass()
            .setYear(year)
            .setMonth(month)
            .setDay(day)
            .setHour(hour)
            .setMinute(minute)
            .setSecond(second);
    }

    static createFromDateObject(date) {
        return new Hourglass()
            .setYear(date.getFullYear())
            .setMonth(date.getMonth() + 1)
            .setDay(date.getDate())
            .setHour(date.getHours())
            .setMinute(date.getMinutes())
            .setSecond(date.getSeconds());
    }

    static today() {
        return Hourglass.createFromTime();
    }

    static parse(date) {
        if (date instanceof Hourglass) {
            return date;
        }
        return Hourglass.createFromDateObject(new Date(date));
    }

    constructor(date = 'now') {
        const now = new Date();
        this.setYear(now.getUTCFullYear())
            .setMonth(now.getUTCMonth() + 1)
            .setDay(now.getUTCDate())
            .setHour(now.getUTCHours())
            .setMinute(now.getUTCMinutes())
            .setSecond(now.getUTCSeconds());
    }
}
