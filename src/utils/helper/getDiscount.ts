export const getDiscount = (price: number, disCounted: number) => {
  return ((price - disCounted) / price) * 100;
};
