export function addUnit(hourglass, property, count, min, max, onOverflow) {
    const tick = max - min + 1;
    const sum = hourglass[property] + count;

    const overflow = sum < min
        ? Math.max(1, Math.floor(Math.abs(sum) / tick)) * -1
        : Math.floor(sum / tick);
    const value = (sum - overflow * tick);

    if (overflow !== 0) {
        onOverflow(overflow);
    }

    hourglass[property] = value;

    return hourglass;
}
