const formOutcome = {formErrors: ["Internal server error"], formSuccess: false};

export const apiErrorHandler = (errsObj) => {
  // error handler to process API errors
  try {
    const msgObj = JSON.parse(errsObj[0].message);
    formOutcome.formErrors = [...msgObj.message];
    formOutcome.formSuccess = false;
    return formOutcome;
  } catch {
    try {
      formOutcome.formErrors = JSON.parse(errsObj.message).message;
      formOutcome.formSuccess = false;
      return formOutcome;
    } catch {
    }
  }
  return formOutcome;
};