import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useEffect } from "react";
import { useCallback } from "react";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

const CountrySelectBox = ({
  allCountrys,
  hisCountry,
  selectCountry,
  selectedCountry,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!allCountrys?.length) return;

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (targetCountry) => {
    handleClose();
    selectCountry(targetCountry);
  };

  useEffect(() => {
    if (!allCountrys?.length || selectedCountry) return;

    const hisCountryData = allCountrys?.find(
      (country) => country?.name === hisCountry
    );

    selectCountry(hisCountryData || allCountrys[0]);
  }, [selectCountry, allCountrys, hisCountry, selectedCountry]);

  return (
    <div>
      <div
        className="border py-2 px-2 rounded-3"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          overflow: "hidden",
        }}
      >
        <article className="d-flex justify-content-center align-items-center">
          {selectedCountry?.logo && (
            <img
              className="me-2"
              width={20}
              height={20}
              src={selectedCountry?.logo}
              alt=""
            />
          )}

          <span
            className="d-block"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: ".8rem",
              cursor: "default",
            }}
          >
            {selectedCountry?.name || "جاري التحميل"}
          </span>

          <span>
            <ArrowDropDownRoundedIcon />
          </span>
        </article>
      </div>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        {allCountrys?.map((option) => (
          <MenuItem key={option.id} onClick={() => handleSelect(option)}>
            <img
              className="ms-2"
              width={30}
              height={30}
              src={option?.logo}
              alt=""
            />
            <span>{option?.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CountrySelectBox;
