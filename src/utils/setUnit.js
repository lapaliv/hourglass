export function setUnit(hourglass, property, value, min, max, overflow) {
    if (value >= min && value <= max) {
        hourglass[property] = value;
    } else {
        hourglass[property] = min;

        overflow(value - min);
    }

    return hourglass;
}
