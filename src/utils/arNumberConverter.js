const arNumberConverter = (arId) => {
  const converter = {
    "٠": 0,
    "١": 1,
    "٢": 2,
    "٣": 3,
    "٤": 4,
    "٥": 5,
    "٦": 6,
    "٧": 7,
    "٨": 8,
    "٩": 9,
  };

  return [...arId].map((arNum) => converter[arNum] || arNum).join("");
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
