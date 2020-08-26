export function addUnit(hourglass, property, count, min, max, onOverflow) {
    const tick = max - min + 1;
    const sum = hourglass[property] + count;
    const overflow = Math.floor(sum / tick);
    const value = sum % tick;

    if (overflow !== 0) {
        onOverflow();
    }

    hourglass[property] = (value < 0 ? tick : 0) + value;

    return hourglass;
}
