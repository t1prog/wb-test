const parseDecimal = (str) => {
    if (str === "-" || str === "" || str == null) {
        return 0;
    }
    const num = parseFloat(str.replace(",", "."));
    if (isNaN(num)) {
        throw new Error(`Invalid decimal format: "${str}"`);
    }
    return num;
};

const parseInteger = (str) => {
    if (str === "-" || str === "" || str == null) {
        return 0;
    }
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Invalid integer format: "${str}"`);
    }
    return num;
};

export { parseDecimal, parseInteger };
