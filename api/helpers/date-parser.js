const CalculateYears = (parsedDate) => {
  const todayDate = new Date();
  let yearsDiff = todayDate.getFullYear() - parsedDate.getFullYear();

  // Adjust years if the today month and day are before the birth month and day
  if (todayDate.getMonth() < parsedDate.getMonth() || (todayDate.getMonth() === parsedDate.getMonth() && todayDate.getDate() < parsedDate.getDate())) {
    yearsDiff--;
  }
  return yearsDiff;
};

const ExtractDateParams = (val) => {
  const splitDate = val.split(new RegExp('[-/]'));
  if (splitDate.length < 3) return null;
  if (splitDate[0].length !== 4 || splitDate[1].length !== 2 || splitDate[2].length !== 2) return null;
  const yr = +splitDate[0];
  const mon = +splitDate[1];
  const dt = +splitDate[2];
  if (Number.isNaN(yr) || Number.isNaN(mon) || Number.isNaN(dt)) return null;
  const monthDex = mon < 0 ? 11 : mon - 1;
  return {fullYear: yr, monDex: monthDex, dt: dt};
};

const CalculateRetirementDate = (parsedDobDate) => {
  parsedDobDate.setFullYear(parsedDobDate.getFullYear() + 65);
  return parsedDobDate;
};

module.exports = {ExtractDateParams, CalculateYears, CalculateRetirementDate};