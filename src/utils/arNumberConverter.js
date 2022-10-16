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

export default arNumberConverter;
