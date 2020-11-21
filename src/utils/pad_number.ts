export const padNumber = (number: number = 0, length: number) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
};
