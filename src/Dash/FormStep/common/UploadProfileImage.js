import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },

  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    border: "3px solid #fff",
  },

  avatar: {
    height: theme.spacing(18),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 16,
    backgroundColor: theme.palette.primary.main,
  },

  upload: {
    backgroundColor: "#FFF",
    marginTop: -30,
    marginRight: 36,
    padding: 3,
  },
}));

function UploadProfileImg({ reset, def, partnerId, open, upload, onClose }) {
  const [profileImg, setProfileImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setProfileImg(null);
    document.getElementById("icon-button-file").value = "";
  }, [reset]);
  const handleProfileImageUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData();
    fd.append("file", profileImg);
    // if (profileImg) {
    //   axios
    //     .post(`/Partners/uploadImagePartner/${partnerId}`, fd)
    //     .then((res) => {
    //       toast.success("تم تغيير الصورة بنجاح");
    //       setIsLoading(false);
    //       onClose();
    //     })
    //     .catch((err) => {
    //       setIsLoading(false);
    //     });
    // }
  };

  const [serverImg, setServerImg] = React.useState("");

  useEffect(() => {
    if (def?.type) {
      setProfileImg(def);
      upload(def);
    }
  }, [def]);

  const classes = useStyles();
  return (
    <div>
      {profileImg ? (
        <div
          style={{
            margin: "auto",
            width: "fit-content",
          }}
        >
          <Avatar
            alt="avatar"
            src={URL.createObjectURL(profileImg)}
            className={classes.large}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              upload(e.target.files[0]);
              setProfileImg(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              className={classes.upload}
            >
              <PhotoCamera style={{ fontSize: 30, color: "#1C1D21" }} />
            </IconButton>
          </label>
        </div>
      ) : (
        <div
          style={{
            margin: "auto",
            width: "fit-content",
          }}
        >
          <Avatar
            alt="avatar"
            src={`data:image/png;base64,${serverImg}`}
            className={classes.large}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              upload(e.target.files[0]);
              setProfileImg(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              className={classes.upload}
            >
              <PhotoCamera style={{ fontSize: 30, color: "#1C1D21" }} />
            </IconButton>
          </label>
          {profileImg && (
            <Button
              className={classes.submitButton}
              color="inherit"
              type="submit"
              disabled={isLoading}
              onClick={handleProfileImageUpload}
              endIcon={
                isLoading && (
                  <CircularProgress size={24} style={{ color: "#DDD" }} />
                )
              }
            >
              تحميل الصورة
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadProfileImg;
