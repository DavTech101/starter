//##########################################################################################
// FORMAT PRICE IN CENTS TO EUROS
//##########################################################################################
const priceFormatter = (priceInCents: number) => {
  const price = priceInCents / 100;

  return new Intl.NumberFormat('nl-NL', {
    currency: 'EUR',
    style: 'currency',
  }).format(price);
};

export default priceFormatter;
