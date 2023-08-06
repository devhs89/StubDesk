export const CalculateTimeDifference = (parsedDate) => {
  const currentDate = new Date();
  const timeDiff = parsedDate - currentDate;
  const secs = Math.floor(timeDiff / 1000);
  const min = Math.floor(secs / 60);
  const hrs = Math.floor(min / 60);
  let dys = Math.floor(hrs / 24);
  let yrs = 0;
  let mth = 0;

  // calculate years, taking leap years into consideration
  while (dys >= 365) {
    if (yrs % 4 === 0) {
      if (dys >= 366) {
        dys -= 366;
        yrs++;
      } else {
        break;
      }
    } else {
      dys -= 365;
      yrs++;
    }
  }

  while (dys >= 28) {
    if (mth === 1) {
      if (yrs % 4 === 0 && (yrs % 100 !== 0 || yrs % 400 === 0)) {
        // add a 29 days month depending on leap year or not
        if (dys >= 29) {
          dys -= 29;
        } else {
          break;
        }
      } else {
        // add a normal 28 days month otherwise
        if (dys >= 28) {
          dys -= 28;
        } else {
          break;
        }
      }
    } else if (mth === 3 || mth === 5 || mth === 8 || mth === 10) {
      // add all 30 days months
      if (dys >= 30) {
        dys -= 30;
      } else {
        break;
      }
    } else {
      // add rest of normal 31 days months
      if (dys >= 31) {
        dys -= 31;
      } else {
        break;
      }
    }
    mth++;
  }
  return {days: dys, months: mth, years: yrs};
};