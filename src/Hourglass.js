export class Hourglass {
    static createFromTime(hour = 0, minute = 0, second = 0) {
        return new Hourglass()
            .setHour(hour)
            .setMinute(minute)
            .setSecond(second);
    }

    static createFromDate(year, month, day) {
        return new Hourglass()
            .setYear(year)
            .setMonth(month)
            .setDay(day);
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
