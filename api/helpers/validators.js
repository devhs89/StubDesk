const validName = (val) => {
  return new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$').test(val);
};

const validAge = (val) => {
  return !Number.isNaN(+val) && (+val >= 20 && +val <= 70);
};

const validJobTitle = (val) => {
  return new RegExp('employee|manager|director|vp').test(val);
};

const validDepartment = (val) => {
  return new RegExp('it|marketing|engineering|hr').test(val);
};

const validEmployeeType = (val) => {
  return new RegExp('seasonal|contract|part-time|full-time').test(val);
};

const validHireDate = (val) => {
  return new Date(val).toString() !== 'Invalid';
};

const validCurrentStatus = (val) => {
  return new RegExp('working|retired').test(val);
};

module.exports = {
  validName, validAge, validJobTitle, validDepartment, validEmployeeType, validHireDate, validCurrentStatus
};