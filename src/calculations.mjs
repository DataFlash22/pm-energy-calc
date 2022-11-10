export function costCalculation (lastYearCosts, incrasePercentage) {
    return lastYearCosts + lastYearCosts * incrasePercentage / 100;
}

export function differenceEuro(lastYearCosts, currentYearCost) {
    return currentYearCost - lastYearCosts;
}

export function differencePercent(euroDif, lastYearCosts) {
    return euroDif / lastYearCosts * 100;
}