import "./AdvertisingUpdateForm.component.scss";
import ButtonShare from "../../../../shared/Button/Button.shared";
import Upload from "../../../../shared/Upload/Upload.shared";
import Progress from "../../../../shared/Upload/Progress/Progress";
import { FileDrop } from "react-file-drop";
import Select from "react-select";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlancerEditTagsComponent from "../../../FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { userProfile } from "../../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import { useNavigate } from "react-router-dom";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { getCategoryValue } from "../../../../core/redux/reducers/CategoryReducer.core";
import { deleteBasicData } from "../../../../core/services/MethodDeleteGlobal/MethodDeleteGlobal.core";
import TextEditorShared from "../../../../shared/TextEditor/TextEditor.shared";
import { toast } from "react-toastify";

import { RegisterServices } from "../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";

import {
  arNumberConverter,
  testNumbers,
} from "../../../../utils/arNumberConverter";

const AdvertisingUpdateFormComponent = ({ advsId }) => {
  const [getAllUserUpdate, messages] = useSelector((state) => [
    state.profileUpdate,
    state.messages,
  ]);
  const [selectedAreName, setSelectedAreName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backButton = useRef();
  const [isLoading, setLoading] = useState(false);
  const errMessage = messages[0]?.messages;
  const inputRef = useRef();
  const media = new FormData();
  const advsMaxCharacters = 5000;
  const [content, setContent] = useState("");
  const [getDescriptionLength, setGetDescriptionLength] = useState(0);
  const theme = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      baseUnit: 0,
      // color: 'red',
      borderRadius: 10,
    },
    colors: {
      ...theme.colors,
      primary25: "#1EAAAD",
      primary: "#02385A",
    },
  });
  const customStyles = {
    control: (base) => ({
      ...base,
      height: "auto",
      minHeight: 70,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderColor: "#E9E9E9",
    }),
  };
  // ================[Block START]================ //
  // TODO Get Advertising Data By ID [START]
  // ?** State To Save Response Data
  const [loadAdvsData, setLoadedAdvsData] = useState();
  const [adsCategory, setAdsCategory] = useState([]);
  //** Function Call API To get Data
  const advsupdateform = useMemo(() => {
    return advertisingLists
      ._GET_MyAdvsById(advsId)
      .then((res) => {
        dispatch(getCategoryValue(res.data.data.category));
        setLoadedAdvsData(res.data.data);
        setAdsCategory(res.data.data.category);
      })
      .catch((err) => {
        return err.response;
      });
  }, [advsId]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loadAdvsData) {
        return advsupdateform;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [loadAdvsData, advsupdateform]);
  // TODO Get Advertising Data By ID [END]
  // ================[Block END]================ //

  // ================[Block START]================ //
  // TODO Get Specific User Category Data By TOKEN [START]
  const [userCategory, setUserCategory] = useState([]);
  const userLoginData = useMemo(() => {
    return userProfile
      ._GET_ProfileByToken(localStorage.getItem("userTK"))
      .then((res) => {
        setUserCategory(res.data.data?.category);
      });
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userCategory) {
        return userLoginData;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [userCategory, userLoginData]);
  // TODO Get Specific User Category Data By TOKEN [END]
  // ================[Block END]================ //

  // ================[Block START]================ //
  // TODO Get Form Input Value Inside Component By OnChange Function [START]
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e?.target;

    // only price number
    if (name === "price" && value && testNumbers(value)) return;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  // TODO et Form Input Value Inside Component By OnChange Function [END]
  // ================[Block END]================ //

  // ================================================[Block START]================================================ //
  // TODO Get Upload Image And Videos Files From Input Value Inside Component By OnChange Function [START]
  const [file, setFiles] = useState({ images: [], videos: [] });
  const [filenames, setNames] = useState([]);
  const fileHandler = (files) => {
    // ** This For Loop To Select Files {[SRC]} By Type In State
    for (let allFile of files) {
      if (allFile.type.match("video/")) {
        file.videos.push(allFile);
      } else if (allFile.type.match("image/")) {
        file.images.push(allFile);
      }
    }
    // ** This For Loop To Select Files Name  In State
    const extension = files[0].name.split(".")[1]?.toLowerCase();
    if (extension !== undefined) {
      const fNames = Object.keys(files).map((name) => {
        return {
          name: files[name].name,
          icon: files[name].name.split(".")[1]?.toUpperCase().trim(),
        };
      });
      setNames((prev) => [...prev, fNames].flat());
    }
  };
  // TODO Get Upload Image And Videos Files From Input Value Inside Component By OnChange Function [END]
  // ================================================[Block END]================================================ //
  // ================[Block START]================ //
  // TODO This Function For Post File To API By Drag And Drop  [START]
  const filePicker = (e) => {
    inputRef.current.click();
    media.append("images", e.target?.files);
  };
  // TODO This Function For Post File To API By Drag And Drop  [END]
  // ================[Block END]================ //

  /// LOCATION
  const [locationState, setLocayionState] = useState(false);
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedArea, setSelectedArea] = useState({});

  const offLineWorkType = useRef();
  const onLineWorkType = useRef();

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

  const showLocation = () => {
    setLocayionState(!locationState);
  };

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

  // ================================================[Block START]================================================ //
  // TODO Main Function Collect All Data Value And Post To API [START]
  const handleCLick = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      getMessages({
        messages: "جارى إرسال التحديث",
        messageType: "warning",
        messageClick: true,
      })
    );

    // @Param Block Of Files Get All And Initial Before Post */
    file.images?.map((image, idx) => {
      media.append(`images[${idx}]`, image);
    });
    file.videos?.map((video, idx) => {
      media.append(`videos[${idx}]`, video);
    });
    media.set("name", formData.name ? formData.name : loadAdvsData.name);
    media.set(
      "description",
      content?.value ? content?.value : loadAdvsData?.description
    );
    media.set(
      "price",
      formData.price
        ? arNumberConverter(formData.price)
        : arNumberConverter(loadAdvsData.price)
    );
    loadAdvsData?.category?.forEach((newCate, idx) => {
      media.append(`category[${idx}]`, newCate.id);
    });

    media.set("country_id", selectedCountry?.id || loadAdvsData?.country?.id);
    media.set("city_id", selectedCity?.id || loadAdvsData?.city?.id);
    media.set("state_id", selectedState?.id || loadAdvsData?.state?.id);
    media.set("area_id", selectedArea?.id || loadAdvsData?.area?.id);
    selectedArea?.id === "1212" && media.set("area_name", selectedAreName);
    media.set("type_work", formData.type_work || loadAdvsData?.type_work);
    if (formData.type_work === "offline") {
      media.set("address", formData.address || loadAdvsData?.address);
    }

    // @Param POST Method To API */
    advertisingLists
      ._POST_UpdateAdvertisingForm(advsId, media)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setLoading(false);
        const resTimeOut = setTimeout(() => {
          navigate(`/advertising/advertise-details/${loadAdvsData.id}`);
        }, 800);
        return () => clearTimeout(resTimeOut);
      })
      .catch((err) => {
        toast.error("حدث خطأ ما");

        dispatch(
          getMessages([
            {
              messages: err.response?.data.message,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        setLoading(false);
      });
  };

  // TODO Main Function Collect All Data Value And Post To API [END]
  // ================================================[Block END]================================================ //
  const handleDelete = (e, fileNewName, i) => {
    if (
      e.nativeEvent.path[4].id === "responseUploadData" ||
      e.nativeEvent.path[5].id === "responseUploadData"
    ) {
      deleteBasicData._Delete_Data(i).then((res) => {
        return res;
      });
    }
    const newfileImage = file.images.filter(
      (element) => element.name !== fileNewName
    );
    const newfileVideo = file.videos.filter(
      (element) => element.name !== fileNewName
    );
    setFiles({ images: newfileImage, videos: newfileVideo });
    setNames((prev) => filenames.filter((each, idx) => idx !== i));
  };
  const open = (url) => {
    window.open(url, "_blank").focus();
  };

  const handleTest = (id) => {
    setAdsCategory((prev) => adsCategory.filter((cur) => cur.id !== id));
  };
  const handleTagChange = (e) => {
    dispatch(getAllUserUpdate.category.push({ e }));
  };
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      {/* LT-request-form [Holder] */}
      <Form onSubmit={handleCLick} className="LT-advs-form-grid py-4 mt-5 px-4">
        {/* Address Request [Section] */}
        <Row className="mb-3 gap-3 flex-column m-0">
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridPassword"
              className="position-relative px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text ">
                عنوان الاعلان
              </Form.Label>
              <Form.Control
                defaultValue={
                  loadAdvsData?.name !== null
                    ? loadAdvsData?.name
                    : formData?.name
                }
                name="name"
                onChange={handleChange}
                className="inpBG inpH uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
                placeholder="علي سبيل المثال , ببناء موقع علي شبكة الانترنت"
              />
              <div className="">
                {errMessage?.name && (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.name}
                  </p>
                )}
              </div>
            </Form.Group>
            <Form.Group
              as={Col}
              sm={6}
              md={3}
              controlId="formGridPassword"
              className="px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text ">
                {" "}
                السعر
              </Form.Label>
              <Form.Control
                name="price"
                onChange={handleChange}
                defaultValue={
                  loadAdvsData?.price ? loadAdvsData?.price : formData?.price
                }
                value={
                  formData?.price === 0 ? loadAdvsData?.price : formData?.price
                }
                className="inpBG inpH uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
                maxLength={6}
                placeholder="0 ريال"
              />
              <div className="">
                {formData.price < 0 ? (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    value must not be 0 or negative number
                  </p>
                ) : (
                  false
                )}
                {errMessage?.price <= 0 && (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.price}
                  </p>
                )}
              </div>
            </Form.Group>
          </div>
        </Row>
        {/* Description Request [Section] */}
        <div className="LT-details-request position-relative">
          <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
            {" "}
            اكتب تفاصيل الطلب
          </Form.Label>
          <TextEditorShared
            setDescription={setContent}
            data={loadAdvsData?.description}
            setMaxLength={setGetDescriptionLength}
            characterLength={advsMaxCharacters}
          />
          <div className="text-start w-100 cLT-smoke-text">
            {getDescriptionLength && getDescriptionLength} / {advsMaxCharacters}
          </div>
          {errMessage?.description && (
            <p
              className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
              style={{ bottom: "0px" }}
            >
              {errMessage?.description}
            </p>
          )}
        </div>
        {/* Upload Files [Holder] */}
        <div className="LT-upload-advs">
          <Upload
            inputRef={inputRef}
            isDrop={fileHandler}
            targetClick={filePicker}
            isHaveData={loadAdvsData?.document}
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
        <div className="d-grid gap-3 pb-4 h-100">
          {/* [Title] */}
          <p className="m-0 fLT-Bold-sA cLT-main-text">
            ما هي المهارات المطلوبة؟
          </p>
          <FlancerEditTagsComponent tags={loadAdvsData?.category} />
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {adsCategory?.map((tag, ix) => {
              return (
                <div
                  key={ix}
                  id={tag?.id}
                  className="css-4vit6s-multiValue d-flex"
                  style={{ width: "max-content" }}
                >
                  <div className="css-12jo7m5">{tag?.name}</div>
                  <div
                    className="css-o833bd"
                    onClick={(e) => handleTest(tag?.id)}
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className="LT-close-hover-red css-tj5bde-Svg"
                    >
                      <path
                        className=""
                        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
                      ></path>
                    </svg>
                  </div>
                </div>
              );
            })}
            {errMessage?.category && (
              <p
                className=" position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                style={{ bottom: "170px" }}
              >
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
                  value={loadAdvsData?.country || selectedCountry}
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
                  value={loadAdvsData?.city || selectedCity}
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
                  value={loadAdvsData?.state || selectedState}
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
                  value={loadAdvsData?.area || selectedArea}
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

        <div className="d-flex align-items-center justify-content-between">
          {/* [Back Button */}
          <div className="d-flex justify-content-end  align-items-left">
            {/* <div className="shadow uLT-f-radius-sB" ref={backButton}>
              <ButtonShare
                onClick={(e) => handleGoBack(e)}
                btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
                textClasses="px-4 cLT-white-text fLT-Regular-sC"
                innerText=" رجــوع"
              />
            </div> */}
          </div>

          {/* [Request Button */}

          <div
            className={` d-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse flex-md-row`}
          >
            <div className="">
              <ButtonShare
                loading={isLoading}
                ID={"send"}
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
        </div>
        {/* [Request Button
                <div className="d-flex justify-content-end  align-items-left">
                    <div className="shadow uLT-f-radius-sB">
                        <ButtonShare loading={isLoading} btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB" textClasses="px-4 cLT-white-text fLT-Regular-sC" innerText=" إرسال" />
                    </div>
                </div> */}
      </Form>
    </>
  );
};

export default AdvertisingUpdateFormComponent;
