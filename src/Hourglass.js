export class Hourglass {
    static createFromTime(hour = 0, minute = 0, second = 0) {
        const hourglass = new Hourglass();
        hourglass.setHour(hour);
        hourglass.setMinute(minute);
        hourglass.setSecond(second);
        return hourglass;
    }
}
