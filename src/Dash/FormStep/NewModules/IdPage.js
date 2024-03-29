import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import Select from "react-select";
import { LabelContext } from "../LabelDataContext/labelDataContext";
import { Col, Form, Row } from "react-bootstrap";
import "../NewStyle.scss";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ButtonShare from "../../../shared/Button/Button.shared";
import { RegisterServices } from "../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../core/redux/reducers/Messages/Messages.core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Upload from "../../../shared/Upload/Upload.shared";
import { useRef } from "react";
import { API } from "../../../enviroment/enviroment/enviroment";
import { toast } from "react-toastify";

import { arNumberConverter } from "../../../utils/arNumberConverter";

const IdPage = () => {
  const [open, setOpen] = useState(true);
  const value = useContext(LabelContext);
  const getClientData = value.labelInfo.clientView;
  const hideIcon = getClientData.password.length > 0;
  const validation = getClientData.nation?.id;
  const dispatch = useDispatch();

  //TODO Data from Reducers
  const navigate = useNavigate();
  const inputRef = useRef();
  const media = new FormData();
  const messages = useSelector((state) => state.messages);
  const [showPassword, setShowPassword] = useState(false);
  const [nations, setNations] = useState([]);
  const [gender, setGender] = useState([]);

  const getNations = () => {
    API.get("coredata/nationality/list")
      .then((res) => {
        setNations(res.data?.data);
      })
      .catch((e) => {});
  };

  const getGenders = () => {
    API.get("/coredata/gender/list")
      .then((res) => {
        setGender(res.data?.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getGenders();
    getNations();
  }, []);

  const getNext = (e) => {
    e.preventDefault();
    if (getClientData.id)
      getClientData.id = arNumberConverter(getClientData.id);

    value.nextPage();
  };

  const getBack = () => {
    value.prevPage();
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [file, setFiles] = useState([]);
  const [filenames, setNames] = useState([]);

  const fileHandler = (files) => {
    const extention = files;

    for (let allFile of extention) {
      // if (allFile.type.match("video/")) {
      file.push(allFile);
      value.setFiles(file);
      // file.videos.push(allFile);
      // } else if (allFile.type.match("image/")) {
      // file.images.push(allFile);
      // }
    }
    const extension = files[0].name.split(".")[1]?.toLowerCase();
    if (extension !== undefined) {
      const fNames = Object.keys(files).map((name) => {
        return {
          name: files[name].name,
          icon: files[name].name.split(".")[1]?.toUpperCase().trim(),
        };
      });
      setNames((prev) => [...prev, fNames].flat());
    } else {
      alert("file type not supported");
    }
  };

  const filePicker = (e) => {
    inputRef.current.click();
    media.append("images", e.target?.files);
  };

  // TODO Function Execute To Remove Upload Files
  const handleDelete = (e, fileNewName, i) => {
    const newfileImage = file.filter(
      (element) => element.name.toLowerCase() !== fileNewName.toLowerCase()
    );

    setFiles(newfileImage);
    value.setFiles(newfileImage);
    setNames((prev) => filenames.filter((each, idx) => idx !== i));
  };

  useEffect(() => {
    if (!getClientData?.files?.length || file.length) return;

    const files = getClientData.files;
    setFiles(files);

    files.forEach((file) => {
      const data = {
        name: file.name.toLowerCase(),
        icon: file.name.split(".").at(-1)?.toLowerCase(),
      };

      setNames((prev) => [...prev, data].flat());
    });
  }, [getClientData.files, file]);

  return (
    <div className="DialogSim2 handelCardSize">
      <form
        // onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column gap-4"
        dir="rtl"
        style={{ maxWidth: "30rem" }}
      >
        <div className="LT-login-holder p-0">
          <div
            style={{ textAlign: "center" }}
            className=" LT-account-logo d-flex flex-column p-3"
          >
            {value?.accountType?.userKind !== "company" ? (
              <p className="regiTitle">معلومات الفرد </p>
            ) : (
              <p className="regiTitle">معلومات الشركه </p>
            )}
          </div>

          <Row className="mb-4 gap-3 two row w-100-in-phone">
            <FormControl>
              <FormLabel
                style={{
                  color: "black",
                  fontSize: "1.4rem",
                  margin: "0 1rem 0 0",
                }}
                id="demo-row-radio-buttons-group-label"
              >
                النوع
              </FormLabel>
              <RadioGroup
                style={{ gap: "5rem" }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={getClientData.gender}
                onChange={value.setDataDetails("gender")}
              >
                {gender.map((ele, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={ele.id}
                    control={<Radio style={{ color: "#1EAAAD" }} />}
                    label={ele.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Form.Group>
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                الجنسية<span className="cLT-danger-text">*</span>
              </Form.Label>
              {/* State [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  value={getClientData.nation?.id ? getClientData.nation : ""}
                  placeholder="جنسية"
                  options={nations}
                  onChange={value.setDataDetails("nation")}
                  getOptionLabel={(city) => city?.name}
                  getOptionValue={(city) => city?.id}
                />
              </div>
              {/* {errMessage?.city_id && (
              <p
                className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                style={{ bottom: "-27px" }}
              >
                {errMessage?.city_id}
              </p>
            )} */}
            </Form.Group>
            <Form.Group>
              {value?.accountType?.userKind !== "company" ? (
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  رقم الهوية
                </Form.Label>
              ) : (
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-3 ">
                  رقم السجل التجاري
                </Form.Label>
              )}
              <Form.Control
                name="id"
                required
                className="uLT-bd-f-platinum-sA inpBG inp"
                type="text"
                placeholder={
                  value?.accountType?.userKind !== "company"
                    ? "ادخل رقم الهوية"
                    : "ادخل رقم السجل التجاري"
                }
                onChange={value.setDataDetails("id")}
                value={getClientData.id}
              />
              {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
            </Form.Group>
            <Form.Group>
              <Upload
                inputRef={inputRef}
                isDrop={fileHandler}
                targetClick={filePicker}
                fileArr={filenames}
                handleDelete={handleDelete}
                title="    صور الاعمال والشهادات"
              />
              {/* <Form.Control
                  name="description"
                  required
                  className="uLT-bd-f-platinum-sA inpBG inp"
                  type="text"
                  placeholder="  "
                  // onChange={value.setDataDetails("email")}

                  //   value={getClientData.email}
                /> */}
              {/* {messages?.messages?.username && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text pt-2 px-2">
                    {messages?.messages?.username}
                  </p>
                )} */}
            </Form.Group>

            <div
              className={`d-flex align-items-center justify-content-around gap-2 mb-3 w-100-in-phone p-0`}
            >
              <div>
                <ButtonShare
                  smBtn
                  onClick={() => getBack()}
                  innerText={"رجــــوع"}
                  btnClasses={"three cLT-secondary-bg"}
                  textClasses={"py-1 px-3 px-md-5 rounded-5"}
                />
              </div>{" "}
              <div>
                <ButtonShare
                  onClick={getNext}
                  type={!validation}
                  innerText={"التـــالى"}
                  btnClasses={"cLT-secondary-bg br14"}
                  textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
                />
              </div>
            </div>
          </Row>
        </div>
      </form>
    </div>
  );
};
export default IdPage;
