import React from "react";

import { Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImgsViewer = ({
  imgs,
  currImg,
  isOpen,
  onClickPrev,
  onClickNext,
  onClose,
  backdropCloseable,
}) => {
  const isNext = () => {
    const currentImgIdx = imgs?.findIndex((img) => img.src === currImg);

    return imgs[currentImgIdx + 1] ? true : false;
  };

  const isPrev = () => {
    const currentImgIdx = imgs.findIndex((img) => img.src === currImg);

    return imgs[currentImgIdx - 1] ? true : false;
  };

  return (
    isOpen && (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          inset: 0,
          zIndex: 99,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            color: "#fff",
            zIndex: 999999,
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <IconButton
          aria-label="close"
          onClick={onClickPrev}
          sx={{
            position: "absolute",
            right: 20,
            top: "30%",
            transform: "translateY(calc(50% + 100px))",
            color: isPrev() ? "#fff" : "#5a5a5a",
            zIndex: 999999,
            pointerEvents: isPrev() ? "all" : "none",
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>

        <Backdrop
          sx={{ color: "#fff", zIndex: 99999 }}
          open={true}
          onClick={backdropCloseable ? onClose : () => {}}
        >
          <article
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999999,
              position: "relative",
            }}
          >
            <div
              style={{ maxWidth: "60%", maxHeight: 800 }}
              className="img border border-3"
            >
              <img
                className="w-100 h-100"
                style={{ objectFit: "fill" }}
                src={currImg}
                alt=""
              />
            </div>
          </article>
        </Backdrop>

        <IconButton
          aria-label="close"
          onClick={onClickNext}
          sx={{
            position: "absolute",
            left: 20,
            top: "30%",
            transform: "translateY(calc(50% + 100px))",
            color: isNext() ? "#fff" : "#5a5a5a",
            zIndex: 999999,
            pointerEvents: isNext() ? "all" : "none",
          }}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      </div>
    )
  );
};

export default ImgsViewer;
