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

const getENId = (arId) => {
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

  return [...arId].map((arNum) => converter[arNum]).join("");
};

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
  const [nextLoading, setNextLoadiing] = useState(false);
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
    if (getClientData.id) getClientData.id = getENId(getClientData.id);

    const { id } = getClientData;
    const currentData = { id };
    setNextLoadiing(true);

    RegisterServices.POST_CheckRegisterData(currentData).then(({ data }) => {
      if (data?.code == 200) {
        setNextLoadiing(false);
        return value.nextPage();
      }

      alert(data.msg);
    });
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
    const newfileImage = file.filter((element) => element.name !== fileNewName);

    setFiles(newfileImage);
    setNames((prev) => filenames.filter((each, idx) => idx !== i));
  };

  return (
    <div className="DialogSim2">
      <form
        // onSubmit={(e) => getNext(e)}
        className="container px-0 my-4 d-flex flex-column gap-4"
        dir="rtl"
        style={{ width: "30rem" }}
      >
        <div className="LT-login-holder">
          <div
            style={{ textAlign: "center" }}
            className=" LT-account-logo d-flex flex-column p-3"
          >
            <p className="regiTitle"> معلومات الفرد </p>
          </div>

          <Row className="mb-4 gap-3 two row">
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
                placeholder="ادخل رقم الهوية "
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
          </Row>
        </div>
        <div
          style={{ direction: "ltr" }}
          className="d-flex align-items-center justify-content-around gap-4"
        >
          <div className="">
            <ButtonShare
              onClick={getNext}
              type={!validation}
              loading={nextLoading}
              innerText={"التـــالى"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
          <div className="">
            <ButtonShare
              onClick={() => getBack()}
              innerText={"رجــــوع"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default IdPage;
