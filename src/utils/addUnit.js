export function addUnit(hourglass, property, count, min, max, onOverflow) {
    const tick = max - min + 1;
    const sum = hourglass[property] + count;
    const overflow = sum < 0
        ? Math.max(1, Math.floor(Math.abs(sum) / tick)) * -1
        : Math.floor(sum / tick);
    const value = (sum - overflow * tick);

    if (overflow !== 0) {
        onOverflow(overflow);
    }

    const methodName = 'set' + property.slice(0, 1).toUpperCase() + property.slice(1);
    hourglass[methodName](value);

    return hourglass;
}
