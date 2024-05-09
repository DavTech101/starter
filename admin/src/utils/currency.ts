//##########################################################################################
// ADD ZEROS TO THE END OF THE STRING
//##########################################################################################
export const addZeros = (value: string, cents: string) => {
  if (cents.length < 1) {
    cents = `00`;
  } else if (cents.length < 2) {
    cents = `${cents}0`;
  }

  if (value.length < 1) {
    value = `0`;
  }

  return parseInt(`${value}${cents}`);
};

//##########################################################################################
// CONVERT NUMBER TO CURRENCY
//##########################################################################################
const toCurrency = (price: number) => {
  const strVal = price.toString();

  if (strVal.length < 3) {
    return parseFloat(`0.${price}`);
  }

  const lastTwo = strVal.slice(-2);
  const first = strVal.slice(0, -2);

  return parseFloat(`${first}.${lastTwo}`).toFixed(2);
};

export default toCurrency;
