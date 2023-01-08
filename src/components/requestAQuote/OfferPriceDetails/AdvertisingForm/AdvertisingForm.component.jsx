import "./AdvertisingForm.component.scss";
import ButtonShare from "../../../../shared/Button/Button.shared";
import Upload from "../../../../shared/Upload/Upload.shared";
import Progress from "../../../../shared/Upload/Progress/Progress";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlancerEditTagsComponent from "../../../FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { userProfile } from "../../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { useNavigate } from "react-router-dom";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import TextEditorShared from "../../../../shared/TextEditor/TextEditor.shared";
import { toast } from "react-toastify";
import { RegisterServices } from "../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { API } from "../../../../enviroment/enviroment/enviroment";

import {
  arNumberConverter,
  testNumbers,
} from "../../../../utils/arNumberConverter";

const AdvertisingFormComponent = () => {
  const [getAllUserUpdate, messages] = useSelector((state) => [
    state.profileUpdate,
    state.messages,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errMessage = messages[0]?.messages;
  const [userCategory, setUserCategory] = useState();
  const [selectedAreName, setSelectedAreName] = useState("");
  const offLineWorkType = useRef();
  const onLineWorkType = useRef();

  const [user, setUser] = useState({});
  const userLoginData = useMemo(async () => {
    try {
      const res = await userProfile._GET_ProfileByToken(
        localStorage.getItem("userTK")
      );

      setUserCategory(res.data.data?.category);

      const res2 = await userProfile._GET_ProfileData(res.data.data?.id);
      setUser(res2.data.data);
      presetLocation(res2.data.data);
    } catch (e) {
      console.log(e);
    }
  }, [localStorage]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userCategory) {
        return userLoginData;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [userCategory, userLoginData]);

  const media = new FormData();

  const [disabled, setDisable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e?.target;

    // only price number
    if (name === "price" && value && testNumbers(value)) return;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const inputRef = useRef();
  const [file, setFiles] = useState({ images: [], videos: [] });
  const [filenames, setNames] = useState([]);
  const fileHandler = (files) => {
    const extention = files;
    for (let allFile of extention) {
      if (allFile.type.match("video/")) {
        file.videos.push(allFile);
      } else if (allFile.type.match("image/")) {
        file.images.push(allFile);
      }
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
  const [advsCheck, setAdvsCheck] = useState(false);
  const [content, setContent] = useState("");
  const [getDescriptionLength, setGetDescriptionLength] = useState(0);
  const handleCLick = (e) => {
    e.preventDefault();

    dispatch(
      getMessages({
        messages: "جاري إرســـال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    setAdvsCheck(true);

    file.images?.map((image, idx) => {
      return media.append(`images[${idx}]`, image);
    });
    file.videos?.map((video, idx) => {
      return media.append(`videos[${idx}]`, video);
    });

    console.log(
      arNumberConverter(formData.price),
      Number(arNumberConverter(formData.price))
    );

    media.set("name", formData.name);
    media.set("description", content);
    Number.isFinite(Number(arNumberConverter(formData.price))) &&
      media.set("price", Number(arNumberConverter(formData.price || "0")));
    getAllUserUpdate.category.forEach((cate, idx) => {
      media.append(`category[${idx}]`, cate);
    });
    media.set("country_id", selectedCountry?.id);
    media.set("city_id", selectedCity?.id);
    media.set("state_id", selectedState?.id);
    media.set("area_id", selectedArea?.id);
    selectedArea?.id === "1212" && media.set("area_name", selectedAreName);
    media.set("type_work", formData.type_work);
    if (formData.type_work === "offline") {
      media.set("address", formData.address);
    }

    advertisingLists
      ._POST_AdvertisingOffer(media)
      .then((res) => {
        setAdvsCheck(false);
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );

        if (res.data.status === 1) {
          const timeAdvsOut = setTimeout(
            () => navigate(`/advertising/page=${1}`),
            800
          );

          return () => clearTimeout(timeAdvsOut);
        }
      })
      .catch((err) => {
        setAdvsCheck(false);

        // let ob = err.response?.data.message;
        // if (ob) {
        //   for (const key in ob) {
        //     let ele = ob[key];

        //     toast.error(ele[0]);
        //   }
        // } else {
        toast.error(
          err?.response?.data.message || err?.message || "حدث خطأ ما"
        );

        dispatch(
          getMessages([
            {
              messages:
                err.response?.data.message || err?.message || "حدث خطأ ما",
              messageType: "error",
              messageClick: true,
            },
          ])
        );
      });
  };
  const handleDelete = (e, fileNewName, i) => {
    const newfileImage = file.images.filter(
      (element) => element.name !== fileNewName
    );
    const newfileVideo = file.videos.filter(
      (element) => element.name !== fileNewName
    );
    setFiles({ images: newfileImage, videos: newfileVideo });
    setNames((prev) => filenames.filter((each, idx) => idx !== i));
  };
  const [locationState, setLocayionState] = useState(false);
  const showLocation = () => {
    setLocayionState(!locationState);
  };
  const backButton = useRef();
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  ////////////////// Location /////////////////
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedArea, setSelectedArea] = useState({});

  const fetchCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity({});
    setSelectedState({});
    setSelectedArea({});
  };
  const fetchCities = (city) => {
    setSelectedCity(city);
    setSelectedState({});
    setSelectedArea({});
  };
  const fetchState = (state) => {
    setSelectedState(state);
    setSelectedArea({});
  };
  const fetchArea = (area) => {
    setSelectedArea(area);
  };
  const presetLocation = (data) => {
    setSelectedCountry(data?.country);
    setSelectedCity(data?.city);
    setSelectedState(data?.state);
    setSelectedArea(data?.area);
  };
  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state", "area"];
    return RegisterServices.GET_RegisterData(
      modal,
      selectedCountry?.id,
      selectedCity?.id,
      selectedState?.id
    ).then((res) => {
      const other = {
        id: "0",
        name: "اخري",
        country: {},
        city: {},
        state: {},
      };

      setGetAllCountryFromResponse({
        ...res.data.data,
        area: [...res.data.data?.area, other],
      });
    });
  }, [selectedCountry, selectedCity, selectedState]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const advsMaxCharacters = 5000;

  useEffect(() => {
    if (
      getAllUserUpdate.category?.length > 0 &&
      selectedArea?.id &&
      !(formData.type_work === "offline" && !formData.address)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [getAllUserUpdate, selectedArea, formData.type_work, formData.address]);
  const [showSkills, setShowSkills] = useState(false);
  const [allSkills, setAllSkills] = useState(false);
  const fetchAllSkills = async () => {
    try {
      const res = await API.get("coredata/category/list");
      setAllSkills(res.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllSkills();
  }, []);

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      {/* LT-request-form [Holder] */}
      <Form className="uLT-f-radius-sB LT-advs-form-grid pt-3 mt-5 px-4">
        {/* Address Request [Section] */}
        <Row className=" flex-column ">
          <div className="d-flex ps-0  ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            <Form.Group
              as={Col}
              md={6}
              controlId="formGridPassword"
              className=" position-relative px-0 ps-md-3"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text ">
                {" "}
                عنوان الاعلان<span className="cLT-danger-text">*</span>{" "}
              </Form.Label>
              <Form.Control
                value={formData?.name}
                name="name"
                onChange={handleChange}
                className="inpBG inpH uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
              />
              <div>
                {errMessage?.name && (
                  <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.name}
                  </p>
                )}
              </div>
            </Form.Group>
            <Form.Group
              as={Col}
              md={6}
              controlId="formGridPassword"
              className=" position-relative px-0 "
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text ">
                {" "}
                السعر
              </Form.Label>
              <Form.Control
                value={formData?.price}
                name="price"
                onChange={handleChange}
                className="inpBG inpH uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
                maxLength={6}
                placeholder="4 ريال"
              />
              <div>
                {errMessage?.price && (
                  <p className="mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                    {errMessage?.price}
                  </p>
                )}
              </div>
            </Form.Group>
          </div>
        </Row>

        <div className=" mt-2 LT-details-request position-relative">
          <Form.Label className="form-label fLT-Bold-sA cLT-main-text ">
            {" "}
            اكتب تفاصيل الطلب<span className="cLT-danger-text">*</span>{" "}
          </Form.Label>
          <TextEditorShared
            setDescription={setContent}
            setMaxLength={setGetDescriptionLength}
            characterLength={advsMaxCharacters}
          />
          {/* <div className="text-start w-100 cLT-smoke-text">
            {getDescriptionLength} / {advsMaxCharacters}
          </div> */}
          {errMessage?.description && (
            <p
              className="mb-0 fLT-Regular-sA cLT-danger-text  px-2"
              style={{ bottom: "0px" }}
            >
              {errMessage?.description}
            </p>
          )}
        </div>

        {/* Upload Files [Holder] */}
        <div className=" LT-upload-advs">
          <Upload
            Sdelet={handleDelete}
            inputRef={inputRef}
            isDrop={fileHandler}
            targetClick={filePicker}
            fileArr={filenames}
            handleDelete={handleDelete}
            uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
            noHover
          />
        </div>
        <Form.Group
          as={Col}
          sm={12}
          controlId="formGridTypeWork"
          className="position-relative px-0 pt-3 pt-md-0 d-grid gap-2"
        >
          <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
            {" "}
            نوع الشغل
          </Form.Label>
          <div
            className="d-flex justify-content-around align-items-center uLT-bd-f-platinum-sA fLT-Regular-sB uLT-f-radius-sB cLT-main-text"
            onChange={handleChange}
          >
            <div className="fLT-Regular-sC  cLT-main-text text-center ">
              <label id="showCompo" className="uLT-click">
                <input
                  type="radio"
                  name="type_work"
                  value="online"
                  datatype="anuone"
                  alt="true"
                  ref={onLineWorkType}
                  defaultChecked
                />
                <span> عن بعد</span>
              </label>
            </div>
            <div
              className=""
              style={{
                width: "1px",
                height: "56px",
                backgroundColor: "#E9E9E9",
              }}
            ></div>
            <div className="fLT-Regular-sC  text-center ">
              <label id="offlineWork" className="uLT-click">
                <input
                  type="radio"
                  name="type_work"
                  value="offline"
                  datatype="anuone"
                  ref={offLineWorkType}
                  alt="true"
                />
                <span> بالحضور </span>
              </label>
            </div>
          </div>
          {errMessage?.type_work && (
            <p
              className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
              style={{ bottom: "-27px" }}
            >
              {errMessage?.type_work}
            </p>
          )}
        </Form.Group>
        {formData.type_work === "offline" && (
          <Row className="mt-4">
            <Form.Group as={Col} md={12} className="mb-3">
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-2">
                العنوان بالتفصيل <span className="cLT-danger-text">*</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                name="address"
                className="uLT-f-radius-sB uLT-bd-f-platinum-sA cLT-main-text"
                type="text"
                value={formData?.address}
                placeholder="العنوان بالتفصيل"
              />
            </Form.Group>
          </Row>
        )}
        {/* Skills-Grid [Holder] */}
        <div className="d-grid  position-relative">
          {/* [Title] */}
          <p className="m-0  mt-3 mt-4 mb-md-3 fLT-Bold-sA small text-muted">
            اختر <span className="cLT-support1-text"> المهارات</span> المناسبة
            لاعلانك<span className="cLT-danger-text">*</span>{" "}
          </p>
          {!showSkills && (
            <FlancerEditTagsComponent
              categoryClass={"pb-0"}
              tags={userCategory}
            />
          )}
          {!showSkills && (
            <p className="mbb">
              لاضافة مهارة جديدة تناسب اعلانك{" "}
              <span
                onClick={() => setShowSkills(!showSkills)}
                className="pointer  cLT-support1-text"
              >
                {" "}
                من هنا
              </span>
            </p>
          )}

          {showSkills && (
            <FlancerEditTagsComponent
              placeholder={"اضف مهارة جديدة"}
              categoryClass={"pb-0 mt-3"}
              tags={allSkills}
            />
          )}
          <div>
            {errMessage?.category && (
              <p className="mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                {errMessage?.category}
              </p>
            )}
          </div>
        </div>
        <div className="  position-relative">
          {/* [Title] */}
          <p className="m-0 mt-2 fLT-Bold-sA cLT-main-text">
            <span className="cLT-support1-text"> الموقع</span>
          </p>
          <div className="locHandler">
            <p className="locationArea">
              حي العلياء , منطقة الرياض , المملكة العربية السعودية{" "}
              <span
                onClick={showLocation}
                className="pointer cLT-support1-text"
              >
                {" "}
                تغيير الموقع
              </span>
            </p>
          </div>
        </div>

        {locationState && (
          <Row className="d-flex align-items-center">
            {/* Country [Section] */}
            <label className="fLT-Regular-sB cLT-support2-text mb-2">
              موقعك
            </label>
            <Form.Group as={Col} md={6} className="mb-3 position-relative ">
              {/* Country [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  value={selectedCountry}
                  placeholder="البلد"
                  className="uLT-f-radius-sB "
                  options={getAllCountryFromResponse?.country}
                  onChange={fetchCountry}
                  getOptionLabel={(country) => country?.name}
                  getOptionValue={(country) => country?.id}
                />
              </div>
              {/* {errMessage?.country_id && (
                <p
                  className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                  style={{ bottom: "-27px" }}
                >
                  {errMessage?.country_id}
                </p>
              )} */}
            </Form.Group>
            {/* State [Section] */}
            <Form.Group as={Col} md={6} className="mb-3 position-relative">
              {/* State [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  value={selectedCity}
                  placeholder="المدينة"
                  options={getAllCountryFromResponse?.city}
                  onChange={fetchCities}
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
          </Row>
        )}
        {locationState && (
          <Row className="d-flex align-items-center">
            {/* Country [Section] */}

            <Form.Group as={Col} md={6} className="mb-3 position-relative ">
              {/* Country [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  value={selectedState}
                  placeholder="المنطقة"
                  className="uLT-f-radius-sB "
                  options={getAllCountryFromResponse?.state}
                  onChange={fetchState}
                  getOptionLabel={(country) => country?.name}
                  getOptionValue={(country) => country?.id}
                />
              </div>
              {/* {errMessage?.country_id && (
                <p
                  className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                  style={{ bottom: "-27px" }}
                >
                  {errMessage?.country_id}
                </p>
              )} */}
            </Form.Group>
            {/* State [Section] */}
            <Form.Group as={Col} md={6} className="mb-3 position-relative">
              {/* State [Option]  */}
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  value={selectedArea}
                  placeholder="الحي"
                  options={getAllCountryFromResponse?.area}
                  onChange={fetchArea}
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

            <Form.Control
              hidden={selectedArea?.id !== "1212"}
              name="area_name"
              required
              style={{ width: "48%" }}
              className="uLT-bd-f-platinum-sA inpBG inp my-3 me-3"
              type="text"
              placeholder="ادخل اسم الحي"
              onChange={(e) => setSelectedAreName(e.target.value)}
            />
          </Row>
        )}

        {/* <div className="btnsHolder">
          <ButtonShare
            onClick={(e) => handleCLick(e)}
            type={disabled}
            loading={advsCheck}
            btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
            textClasses="px-4 cLT-white-text fLT-Regular-sC"
            innerText=" إرسال"
          />

          <ButtonShare
            onClick={() => navigate("/")}
            btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
            textClasses="px-4 cLT-white-text fLT-Regular-sC"
            innerText=" رجوع"
          />
        </div> */}

        <div
          className={` d-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse flex-md-row`}
        >
          <div className="">
            <ButtonShare
              type={disabled}
              onClick={(e) => handleCLick(e)}
              innerText={"إرسال"}
              btnClasses={"cLT-secondary-bg br14"}
              textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
            />
          </div>
          <div className="">
            <ButtonShare
              smBtn
              onClick={() => navigate("/")}
              innerText={"رجوع"}
              btnClasses={"three cLT-secondary-bg"}
              textClasses={"py-1 px-3 px-md-5 rounded-5"}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default AdvertisingFormComponent;
