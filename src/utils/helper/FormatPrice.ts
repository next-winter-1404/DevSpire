export const FormatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};
