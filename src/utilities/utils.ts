// ====================================== STRING TYPE GUARD =================================================
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// ====================================== DATE TYPE GUARD =================================================
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export {
    isString,
    isDate, 
};