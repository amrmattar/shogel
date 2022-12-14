import React from "react";

const RangePriceFilterComponent = ({ rangId }) => {
  function limitRange() {
    let parent = document.getElementById(`${rangId}`);
    if (!parent) return;

    let rangeS = parent.querySelectorAll("input[type=range]"),
      numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function (el) {
      el.oninput = function () {
        let slide1 = parseFloat(rangeS[0].value),
          slide2 = parseFloat(rangeS[1].value);

        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
        }
        numberS[0].value = slide1;
        numberS[1].value = slide2;
      };
    });

    numberS.forEach(function (el) {
      el.oninput = function () {
        let number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);

        if (number1 > number2) {
          let tmp = number1;
          numberS[0].value = number2;
          numberS[1].value = tmp;
        }

        rangeS[0].value = number1;
        rangeS[1].value = number2;
      };
    });
  }
  return (
    <div
      id={rangId}
      className="range-slider w-100 h-100 gap-3"
      onChange={limitRange}
    >
      <div className="range-group">
        <input
          className="range-input"
          defaultValue="0"
          min="0"
          max="1000"
          step="1"
          type="range"
        />
        <input
          className="range-input"
          defaultValue="500"
          min="0"
          max="1000"
          step="1"
          type="range"
        />
      </div>
      <div className="number-group d-flex gap-2 align-items-center justify-content-center fLT-Regular-sB">
        <span className="cLT-gray-text">من</span>
        <input
          name="range"
          className="number-input cLT-gray-text uLT-border-0 uLT-outline-0 fLT-Regular-sB"
          type="number"
          defaultValue="0"
          min="0"
          max="1000"
        />
        <span className="cLT-gray-text">ريال</span>
        <span className="cLT-gray-text">الي</span>
        <input
          name="range"
          className="number-input cLT-gray-text uLT-border-0 uLT-outline-0 fLT-Regular-sB"
          type="number"
          defaultValue="500"
          min="0"
          max="1000"
        />
        <span className="cLT-gray-text">ريال</span>
      </div>
    </div>
  );
};

export default RangePriceFilterComponent;
