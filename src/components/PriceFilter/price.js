import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import "./price.css";
import classes from "./price.module.css";

function valuetext(value) {
  return `${value}°C`;
}

const PriceSlider = ({ changePrice, title, quote }) => {
  const [value, setValue] = useState([0, 1000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
     if (value[1] !== 0) {
      changePrice([value[0], value[1]]);
    }
  }, [ value]);

  return (
    <div className={classes.mainholder}>
      <p className={classes.p}>{title}</p>

      <Box className={classes.slider} sx={{ width: 110 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={3000}
        />
      </Box>
      <p className={classes.desc}>
        من {value[0]} {quote} الي {value[1]} {quote}
      </p>
    </div>
  );
};
export default PriceSlider;
