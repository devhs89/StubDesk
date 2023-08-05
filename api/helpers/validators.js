// all validators

const validName = (val) => {
  if (!val) return false;
  return new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$').test(val);
};

const validDobDate = (val) => {
  if (!val) return false;
  const splitDate = val.split(new RegExp('[-/]'));
  if (splitDate.length < 3) return false;
  const monthDex = +splitDate[1] - 1 < 0 ? 11 : +splitDate[1] - 1;
  const parsedDob = new Date(splitDate[0], monthDex, splitDate[2]);
  if (Number.isNaN(parsedDob.valueOf())) return false;
  const todayDate = new Date();
  let diffInYears = todayDate.getFullYear() - parsedDob.getFullYear();

  // Adjust years if the today month and day are before the birth month and day
  if (todayDate.getMonth() < parsedDob.getMonth() || (todayDate.getMonth() === parsedDob.getMonth() && todayDate.getDate() < parsedDob.getDate())) {
    diffInYears--;
  }
  return diffInYears >= 20 && diffInYears <= 70;
};

const validJobTitle = (val) => {
  if (!val) return false;
  return new RegExp('employee|manager|director|vp').test(val);
};

const validDepartment = (val) => {
  if (!val) return false;
  return new RegExp('it|marketing|engineering|hr').test(val);
};

const validEmployeeType = (val) => {
  if (!val) return false;
  return new RegExp('seasonal|contract|part-time|full-time').test(val);
};

const validHireDate = (val) => {
  if (!val) return false;
  return new Date(val).toString() !== 'Invalid';
};

const validCurrentStatus = (val) => {
  if (!val) return false;
  return new RegExp('working|retired').test(val);
};

module.exports = {
  validName, validDobDate, validJobTitle, validDepartment, validEmployeeType, validHireDate, validCurrentStatus
};