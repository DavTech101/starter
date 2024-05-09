//##########################################################################################
// CONVERT STRING TO ARRAY
//##########################################################################################
export const commaToArray = (value: string | null) => {
  if (!value) return null;

  return value.split(',').map((item) => item.trim());
};
