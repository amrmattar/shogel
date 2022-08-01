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

const AdvertisingFormComponent = () => {
  const [getAllUserUpdate, messages] = useSelector((state) => [
    state.profileUpdate,
    state.messages,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errMessage = messages[0]?.messages;
  const [userCategory, setUserCategory] = useState();
  const [user, setUser] = useState({});
  const userLoginData = useMemo(async () => {
    try {
      const res = await userProfile._GET_ProfileByToken(
        localStorage.getItem("userTK")
      );

      setUserCategory(res.data.data?.category);

      const res2 = await userProfile._GET_ProfileData(res.data.data?.id);
      setUser(res2.data.data);
      fetchCountry(res2.data.data?.country);
      fetchCities(res2.data.data?.city);
      fetchArea(res2.data.data?.state);
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
    media.set("name", formData.name);
    media.set("description", content?.value);
    media.set("price", formData.price);
    getAllUserUpdate.category.forEach((cate, idx) => {
      media.append(`category[${idx}]`, cate);
    });
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
          const timeAdvsOut = setTimeout(() => {
            navigate(`/advertising/page=${1}`);
          }, 800);
          return () => clearTimeout(timeAdvsOut);
        }
      })
      .catch((err) => {
        setAdvsCheck(false);

        let ob = err.response?.data.message;
        if (ob) {
          for (const key in ob) {
            let ele = ob[key];

            toast.error(ele[0]);
          }
        } else {
          toast.error("حدث خطأ ما");
        }

        dispatch(
          getMessages([
            {
              messages: err.response?.data.message,
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
  const [selectedState, setSelectedState] = useState({});
  const [selectedArea, setSelectedArea] = useState({});
  const fetchCountry = (country) => {
    setSelectedCountry(country);
  };
  const fetchCities = (city) => {
    setSelectedState(city);
  };
  const fetchArea = (area) => {
    setSelectedArea(area);
  };
  const getCoreData = useMemo(() => {
    let modal = ["country", "city", "state"];
    return RegisterServices.GET_RegisterData(
      modal,
      selectedCountry?.id,
      selectedState?.id
    ).then((res) => {
      setGetAllCountryFromResponse(res.data.data);
    });
  }, [selectedCountry, selectedState]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const advsMaxCharacters = 5000;

  useEffect(() => {
    if (
      formData.name.length > 6 &&
      content.length > 20 &&
      getAllUserUpdate.category[0]
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [formData, content, getAllUserUpdate]);
  const [showSkills, setShowSkills] = useState(false);
  const [allSkills, setAllSkills] = useState(false);
  const fetchAllSkills = async () => {
    try {
      const res = await API.get("coredata/tag/search");
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
      <Form
        onSubmit={(e) => handleCLick(e)}
        className="uLT-f-radius-sB LT-advs-form-grid pt-3 mt-4 px-4"
      >
        {/* Address Request [Section] */}
        <Row className=" flex-column ">
          <div className="d-flex ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              controlId="formGridPassword"
              className=" position-relative px-0 "
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
                placeholder="علي سبيل المثال , ببناء موقع علي شبكة الانترنت"
              />
              {/* <div>
                {errMessage?.name && (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.name}
                  </p>
                )}
              </div> */}
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
          {/* {errMessage?.description && (
            <p
              className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
              style={{ bottom: "0px" }}
            >
              {errMessage?.description}
            </p>
          )} */}
        </div>
        <Form.Group
          as={Col}
          sm={6}
          md={3}
          controlId="formGridPassword"
          className=" position-relative px-0"
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
            type="number"
            placeholder="0 ريال"
          />
          {/* <div>
            {errMessage?.price && (
              <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                {errMessage?.price}
              </p>
            )}
          </div> */}
        </Form.Group>
        {/* Upload Files [Holder] */}
        <div className=" LT-upload-advs">
          <Upload
            inputRef={inputRef}
            isDrop={fileHandler}
            targetClick={filePicker}
            fileArr={filenames}
            handleDelete={handleDelete}
            uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
          />
        </div>
        {/* Skills-Grid [Holder] */}
        <div className="d-grid  position-relative">
          {/* [Title] */}
          <p className="m-0  mt-3 fLT-Bold-sA">
            اختر <span className="cLT-support1-text"> المهارات</span> المناسبة
            لاعلانك<span className="cLT-danger-text">*</span>{" "}
          </p>
          <FlancerEditTagsComponent
            categoryClass={"pb-0 "}
            tags={userCategory}
          />
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
          {showSkills && (
            <FlancerEditTagsComponent
              placeholder={"اضف مهارة جديدة"}
              categoryClass={"pb-0 mt-3"}
              tags={allSkills}
            />
          )}
          {/* <div>
            {errMessage?.category && (
              <p className=" position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                {errMessage?.category}
              </p>
            )}
          </div> */}
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
            <div className="btnH">
              <ButtonShare
                type={disabled}
                loading={advsCheck}
                btnClasses="cLT-secondary-bg py-2  px-4 uLT-f-radius-sB"
                textClasses="px-4 cLT-white-text fLT-Regular-sC"
                innerText=" إرسال"
              />
            </div>
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
                  value={selectedState}
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
                  value={selectedArea}
                  placeholder="المنطقة"
                  className="uLT-f-radius-sB "
                  options={getAllCountryFromResponse?.state}
                  onChange={fetchArea}
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
                  placeholder="الحي"
                  // options={getAllCountryFromResponse?.city}
                  // onChange={fetchCities}
                  // getOptionLabel={(city) => city?.name}
                  // getOptionValue={(city) => city?.id}
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
      </Form>
    </>
  );
};

export default AdvertisingFormComponent;
