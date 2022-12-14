import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChosedSkill from "./ChosedSkill";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const DrawerSkls = ({
  isOpenSklsPopup,
  setIsOpenSklsPopup,
  chosedSkills,
  setChosedSkills,
  handleRemoveChosedSkills,
}) => {
  const toggleDrawer = (newOpen) => () => {
    setIsOpenSklsPopup(newOpen);
  };

  // This is used only for the example
  const container =
    typeof window !== "undefined" ? () => document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        className="d-md-none"
        container={container}
        anchor="bottom"
        open={isOpenSklsPopup}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <div className="d-flex align-items-center justify-content-between">
            <Typography sx={{ p: 2, color: "#000" }}>
              {chosedSkills?.length} مهارات
            </Typography>
            <Typography
              onClick={() => setChosedSkills([])}
              sx={{ p: 2, color: "#1eaaad", cursor: "pointer" }}
            >
              مسح الجميع
            </Typography>
          </div>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <div className={`row`}>
            {chosedSkills.map((skill, idx) => (
              <div key={idx} className="col-md-6">
                <ChosedSkill
                  close={() => handleRemoveChosedSkills(skill.id)}
                  skill={skill}
                />
              </div>
            ))}
          </div>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default DrawerSkls;
