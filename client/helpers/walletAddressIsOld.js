import "regenerator-runtime/runtime";
/*
/--------------------------/
function: walletAddressIsOld
/--------------------------/
goal: given a certain date transaction (Unix timestamp) determines if account address is Old. It means if current date is greater than 1 year ago.
*/

export const walletAddressIsOld = (dateTransaction) => {
  const date = new Date();
  const dateLessOneYear = Math.floor(
    date.setMonth(date.getMonth() - 12) / 1000
  );
  return dateTransaction <= dateLessOneYear;
};
