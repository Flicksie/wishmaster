
export const hasEnded = (e,y,m) => 
    e.recurring && ( (e.endYear < y) || (e.endYear === y && e.endMonth <= m) );
export const hasStarted = (e,y,m) =>
    e.recurring && ((e.year < y) || ( (e.year <= y) && (e.month <= m) ));

// Filter function for monthly 
export const fromMonth = (e,y,m) => 
    (e.year === y && e.month === m)

/**
 * 
 * @param {Object} e ENTRY
 * @param {Number} y YEAR
 * @param {Number} m MONTH
 * @returns Boolean
 */
export const activeInMonth = (e,y,m) =>
    fromMonth(e,y,m) || (hasStarted(e,y,m) && !hasEnded(e,y,m))

