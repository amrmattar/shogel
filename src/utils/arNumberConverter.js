const arNumberConverter = (arId) => {
  const checkSecNumbers = (num) => {
    const number = "٠١٢٣٤٥٦٧٨٩".indexOf(num);

    return number >= 0 ? number : num;
  };

  const enNumber = [...String(arId)]
    .map((num) => {
      const number = "۰۱۲۳٤۵٦۷۸۹".indexOf(num);

      return number >= 0 ? number : checkSecNumbers(num);
    })
    .join("");

  return enNumber;
};

const testNumbers = (chr) => {
  const allNumbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "٠",
    "١",
    "٢",
    "٣",
    "٤",
    "٥",
    "٦",
    "٧",
    "٨",
    "٩",
  ];
  let inValid = false;

  [...chr].forEach((chr) => {
    if (!allNumbers.includes(`${chr}`)) return (inValid = true);
  });

  return inValid;
};

export { arNumberConverter, testNumbers };
