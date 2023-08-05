// all validators

const validName = (val) => {
  if (!val) return false;
  return new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$').test(val);
};

const validAge = (val) => {
  if (!val) return false;
  return !Number.isNaN(+val) && (+val >= 20 && +val <= 65);
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
  validName, validAge, validJobTitle, validDepartment, validEmployeeType, validHireDate, validCurrentStatus
};