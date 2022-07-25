import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import "./price.css";
import classes from "./price.module.css";

function valuetext(value) {
  return `${value}°C`;
}

const PriceSlider = ({ changePrice }) => {
  const [value, setValue] = useState([0, 300]);
  const [clear, setclear] = useState(false);
  const handleChange = (event, newValue) => {
    setclear(false);
    setValue(newValue);
  };

  useEffect(() => {
    if (clear) {
      changePrice({ minprice: null, maxprice: null });
    } else if (value[1] !== 0) {
      changePrice({ minprice: value[0], maxprice: value[1] });
    }
  }, [clear, value]);

  return (
    <div className={classes.mainholder}>
      <p className={classes.p}>تحديد السعر</p>

      <Box className={classes.slider} sx={{ width: 110 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={1000}
        />
      </Box>
      <p className={classes.desc}>
        من {value[0]} ريال الي {value[1]} ريال
      </p>
    </div>
  );
};
export default PriceSlider;
