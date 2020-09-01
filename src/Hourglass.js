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
            .setDay(day);
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

    static today() {
        return Hourglass.createFromTime();
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
