import "./OfferPriceForm.component.scss";
import ButtonShare from "../../../../shared/Button/Button.shared";
import Select from "react-select";
import Upload from "../../../../shared/Upload/Upload.shared";
import $ from "jquery";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlancerEditTagsComponent from "../../../FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import { userOfferPrice } from "../../../../core/services/OfferPriceService/OfferPriceService.core";
import { Col, Form, Row } from "react-bootstrap";
import { RegisterServices } from "../../../../core/services/AuthServices/Method_RegisterData/Method_RegisterData.core";
import { useLocation, useNavigate } from "react-router-dom";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import TextEditorShared from "../../../../shared/TextEditor/TextEditor.shared";
import { toast } from "react-toastify";
import { userProfile } from "../../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import LocationHandler from "./LocationHandler";
import {
  arNumberConverter,
  testNumbers,
} from "../../../../utils/arNumberConverter";
import axios from "axios";

const OfferPriceForm = () => {
  const [selectedAreName, setSelectedAreName] = useState("");

  const [user, offerCategory, getAllUserUpdate, messages] = useSelector(
    (state) => [
      state.authentication,
      state.coreData.category,
      state.profileUpdate,
      state.messages,
    ]
  );

  const onLineWorkType = useRef();
  const offLineWorkType = useRef();

  const userLoginData = useMemo(async () => {
    try {
      const res = await userProfile._GET_ProfileByToken(
        localStorage.getItem("userTK")
      );

      const res2 = await userProfile._GET_ProfileData(res.data.data?.id);
      presetLocation(res2.data.data);
    } catch (e) {
      console.log(e);
    }
  }, [localStorage]);
  useEffect(() => {
    return userLoginData;
  }, []);
  const errMessage = messages[0]?.messages;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maxCharacters = 5000;
  const recivedData = JSON.parse(localStorage.getItem("TD"));
  const offerPrice = new FormData();
  const [content, setContent] = useState("");
  const [getDescriptionLength, setGetDescriptionLength] = useState(0);
  //TODO Get Location Input Value [Country-City-State]
  const [getAllCountryFromResponse, setGetAllCountryFromResponse] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedCity, setSelectedCity] = useState();

  // get his country
  useEffect(() => {
    const getHisCountry = async () => {
      const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
      };

      getCoords().then(async ({ lat, lon }) => {
        const hisCountryUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ar&key=AIzaSyAeMiz0Z5VKOjU4TUxh-2RgZt7PnWQXxoQ`;

        const { data: hisDataCountry } = await axios(hisCountryUri);

        let city = "";
        let country = "";

        if (hisDataCountry?.status == "OK") {
          if (hisDataCountry?.results[1]) {
            //find country name
            for (
              var i = 0;
              i < hisDataCountry?.results[0].address_components.length;
              i++
            ) {
              for (
                var b = 0;
                b <
                hisDataCountry?.results[0].address_components[i].types.length;
                b++
              ) {
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (
                  hisDataCountry?.results[0].address_components[i].types[b] ==
                  "administrative_area_level_1"
                ) {
                  //this is the object you are looking for
                  city = hisDataCountry?.results[0].address_components[
                    i
                  ]?.short_name?.replace("محافظة ", "");
                  break;
                } else if (
                  hisDataCountry?.results[0].address_components[i].types[b] ==
                  "country"
                ) {
                  //this is the object you are looking for
                  country =
                    hisDataCountry?.results[0].address_components[i]?.long_name;
                  break;
                }
              }
            }

            // set country code
            setSelectedCountry({ name: country });
            setSelectedCity({ name: city });
          }
        }
      });
    };

    getHisCountry();
  }, []);

  useEffect(() => {
    if (!getAllCountryFromResponse) return;

    if (!selectedCountry?.id && selectedCountry?.name) {
      const currentCountry = getAllCountryFromResponse?.country?.find(
        (country) => country?.name?.includes(selectedCountry?.name)
      );

      if (currentCountry) {
        setSelectedCountry(currentCountry);
      }
    }

    if (!selectedCity?.id && selectedCity?.name) {
      const currentCity = getAllCountryFromResponse?.city?.find((city) => {
        const cleanedStr = selectedCity?.name?.replace(/[\u200D\u202C]/g, "");
        return city?.name?.includes(cleanedStr);
      });

      if (currentCity) {
        setSelectedCity(currentCity);
      }
    }
  }, [getAllCountryFromResponse, selectedCountry, selectedCity]);

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
    // data?.country && setSelectedCountry(data?.country);
    // data?.city && setSelectedCity(data?.city);
    // setSelectedState(data?.state);
    // setSelectedArea(data?.area);
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
  }, [selectedCountry, selectedState, selectedCity]);
  useEffect(() => {
    return getCoreData;
  }, [getCoreData]);

  const [formData, setFormData] = useState({
    name: recivedData?.title ? recivedData?.title : "",
    description: recivedData?.description ? recivedData?.description : "",
    time: "",
    type_work: "online",
    address: "",
  });

  const inputRef = useRef();
  const backButton = useRef();
  const [newfile, setFiles] = useState({ images: [], videos: [], any: [] });
  const [filenames, setNames] = useState([]);
  const [locationState, setLocationState] = useState(false);
  const fileHandler = (files) => {
    const extention = files;
    for (let allFile of extention) {
      if (allFile.type.match("video/")) {
        newfile.videos.push(allFile);
      } else if (allFile.type.match("image/")) {
        newfile.images.push(allFile);
      } else {
        newfile.any.push(allFile);
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
  const handleDelete = (e, fileNewName, i) => {
    const newfileImage = newfile.images.filter(
      (element) => element.name !== fileNewName
    );
    const newfileVideo = newfile.videos.filter(
      (element) => element.name !== fileNewName
    );
    setFiles({ images: newfileImage, videos: newfileVideo });
    setNames((prev) => filenames.filter((each, idx) => idx !== i));
  };
  const filePicker = (e) => {
    inputRef.current.click();
    offerPrice.append("images", e.target?.files);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (name == "type_work" && value == "offline") {
      setLocationState(true);
    }

    if (name == "type_work" && value == "online") {
      setLocationState(false);
    }

    // only time number
    if (name === "time" && value && testNumbers(value)) return;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const [advsCheck, setAdvsCheck] = useState(false);

  const handleCLick = async (e) => {
    e.preventDefault();

    if (!user?.loggedIn) {
      return navigate("/register");
    }

    dispatch(
      getMessages({
        messages: "جاري إرســـال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );

    setAdvsCheck(true);
    newfile.videos?.forEach((video, idx) => {
      return offerPrice.append(`videos[${idx}]`, video);
    });
    newfile.images?.forEach((image, idx) => {
      return offerPrice.append(`images[${idx}]`, image);
    });
    newfile.any?.forEach((file, idx) => {
      return offerPrice.append(`document[${idx}]`, file);
    });

    offerPrice.set("name", formData.name);
    offerPrice.set("description", content);
    offerPrice.set("type_work", formData.type_work);
    offerPrice.set("time", arNumberConverter(formData.time || 0));
    if (formData.type_work === "offline") {
      offerPrice.set("address", formData.address);
    }

    offerPrice.set("country_id", selectedCountry?.id || 0);
    offerPrice.set("city_id", selectedCity?.id || 0);
    !selectedCountry?.id &&
      offerPrice.set("country_name", selectedCountry?.name);
    !selectedCity?.id && offerPrice.set("city_name", selectedCity?.name);

    selectedState?.id && offerPrice.set("state_id", selectedState?.id);
    selectedArea?.id && offerPrice.set("area_id", selectedArea?.id);
    selectedArea?.id == "0" && offerPrice.set("area_name", selectedAreName);
    getAllUserUpdate.category?.forEach((cate, idx) => {
      offerPrice.append(`category[${idx}]`, cate);
    });

    userOfferPrice
      ._POST_RequestOffer(offerPrice)
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
          localStorage.removeItem("TD");
          const timeAdvsOut = setTimeout(() => {
            navigate(`/orders/page=${1}`);
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
          toast.error(err?.message || err?.msg || "حدث خطأ ما");
        }

        dispatch(
          getMessages([
            {
              messages: ob,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
      });
  };
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      getAllUserUpdate.category?.length > 0 &&
      !(formData.type_work === "offline" && !formData.address)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [getAllUserUpdate, selectedArea, formData.type_work, formData.address]);

  const [anyJob, setAnyJob] = useState(false);

  return (
    <>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      {/* LT-request-form [Holder] */}
      <Form className="LT-request-form-grid h100 pt-3 mt-5 px-4 uLT-f-radius-sB ">
        {/* Address Request [Section] */}
        <Row className="m-0 flex-column m-0">
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row">
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              controlId="formGridPassword"
              className="position-relative px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                {" "}
                عنوان الطلب<span className="cLT-danger-text">*</span>{" "}
                <span className="small">(يجب ان يكون اكثر من 10 حروف)</span>
              </Form.Label>
              <Form.Control
                required
                value={formData?.name}
                name="name"
                onChange={handleChange}
                className="inpBG uLT-bd-f-platinum-sA uLT-f-radius-sB fLT-Regular-sB"
                type="text"
              />
              {errMessage?.name && (
                <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                  {errMessage?.name}
                </p>
              )}
            </Form.Group>
          </div>
        </Row>
        {/* Details Request [Section] */}
        <div className=" position-relative mt-2 mb-2">
          <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
            {" "}
            اكتب تفاصيل الطلب<span className="cLT-danger-text">*</span>{" "}
          </Form.Label>
          <TextEditorShared
            data={recivedData?.description}
            setDescription={setContent}
            setMaxLength={setGetDescriptionLength}
            characterLength={maxCharacters}
          />
          {/* <div className="text-start w-100 cLT-smoke-text">
            {getDescriptionLength} / {maxCharacters}
          </div> */}
          {errMessage?.description && (
            <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
              {errMessage?.description}
            </p>
          )}
        </div>
        <Row className="mb-3 flex-column m-0 pt-3">
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row p-0">
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridTime"
              className="position-relative px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                مدة الشغل{" "}
                <span className="fLT-Regular-sB cLT-smoke-text">اختياري </span>
              </Form.Label>
              <Form.Control
                maxLength={6}
                name="time"
                onChange={handleChange}
                value={formData?.time || ""}
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
                placeholder="30 يوم"
              />
              {errMessage?.time && (
                <p
                  className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                  style={{ bottom: "-27px" }}
                >
                  {errMessage?.time}
                </p>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={6}
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
          </div>

          {formData.type_work === "offline" && (
            <Row className="mt-4">
              <Form.Group as={Col} md={12} className="mb-3">
                <Form.Label className="fLT-Regular-sB cLT-support2-text mb-2">
                  العنوان بالتفصيل <span className="cLT-danger-text">*</span>{" "}
                  <span className="small">(يجب ادخال المنطقه ايضا)</span>
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
        </Row>
        {/* Time And Type Of Work [Section] */}
        {/* <Row className="mb-1 flex-column m-0 pt-0">
          <div className="d-flex gap-3 ps-0 ps-md-3 pe-0 mx-0 flex-column flex-md-row p-0">
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridTime"
              className="position-relative px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                مدة الشغل{" "}
                <span className="fLT-Regular-sB cLT-smoke-text">اختياري </span>
              </Form.Label>
              <Form.Control
                value={formData?.time}
                name="time"
                onChange={handleChange}
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB inpBG"
                type="text"
                placeholder="30 يوم"
              />
              {errMessage?.time && (
                <p
                  className=" mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                  style={{ bottom: "-27px" }}
                >
                  {errMessage?.time}
                </p>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridTypeWork"
              className="position-relative px-0 pt-3 pt-md-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                {" "}
                نوع الشغل
              </Form.Label>
              <div
                className="inpBG d-flex justify-content-around align-items-center uLT-bd-f-platinum-sA fLT-Regular-sB uLT-f-radius-sB cLT-main-text"
                onChange={handleChange}
              >
                <div className=" fLT-Regular-sC  cLT-main-text text-center ">
                  <label id="showCompo" className="uLT-click">
                    <input
                      type="radio"
                      name="type_work"
                      value="online"
                      datatype="anuone"
                      alt="true"
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
                  <label id="showCompo" className="uLT-click">
                    <input
                      type="radio"
                      name="type_work"
                      value="offline"
                      datatype="anuone"
                      alt="true"
                    />
                    <span> بالحضور </span>
                  </label>
                </div>
              </div>
              {errMessage?.type_work && (
                <p
                  className=" mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                  style={{ bottom: "-27px" }}
                >
                  {errMessage?.type_work}
                </p>
              )}
            </Form.Group>
          </div>
        </Row> */}
        {/* Location [Section] */}

        {/* State Of Location Show Only Type Of Work === Offline */}

        {/* <Row>
        
            <Form.Group as={Col} md={6} className="mb-3">
        
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-2">
                {" "}
                المنطقة{" "}
              </Form.Label>
              <div
                className={` uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
              >
                <Select
                  placeholder="المنطقة"
                  options={getAllCountryFromResponse?.state}
                  onChange={fetchState}
                  getOptionLabel={(state) => state?.name}
                  getOptionValue={(state) => state?.id}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3 ">
              <Form.Label className="fLT-Regular-sB cLT-support2-text mb-2">
                العنوان بالتفصيل
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                name="address"
                className="uLT-f-radius-sB uLT-bd-f-platinum-sA"
                type="text"
                value={formData?.address}
                placeholder="العنوان بالتفصيل"
              />
            </Form.Group>
          </Row>
   */}

        <div className="finalH">
          {/* Skills-Grid [Holder] */}
          <div className="LT-skills-request~ d-grid gap-3 w60 position-relative">
            {/* [Title] */}
            <p className="m-0 fLT-Bold-sA cLT-main-text">
              ما هي المهارات{" "}
              <span className="cLT-support1-text">و المجالات</span> المطلوبة؟
              <span className="cLT-danger-text">*</span>{" "}
            </p>
            <FlancerEditTagsComponent
              tags={offerCategory}
              anyJob={anyJob}
              nobottomMargin
              // tagDescription={`ادخل ما يصل الي 5 مهارات تصف مشروعك علي افضل وجة سيستخدم المشتغلين هذه المهارات للعثوار علي المشاريع التي يهتمون بها و يختبرونها اكثر
              //             `}
            />
            {errMessage?.category && (
              <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                {errMessage?.category}
              </p>
            )}

            <p className="small-font d-none d-md-block">
              اذا كان طلبك لا يحتاج لمهارات خاصة فبآمكانك توجية الطلب لمجال
              <span
                onClick={() => setAnyJob(true)}
                className="fLT-Bold-sA cLT-support1-text pointer"
              >
                {" "}
                اي شغل{" "}
              </span>
            </p>
          </div>
          {/* <div className="d-flex align-items-center justify-content-between"> */}
          {/* [Back Button */}
          {/* <div className="d-flex justify-content-end  align-items-left"> */}
          {/* <div className="shadow uLT-f-radius-sB" ref={backButton}>
              <ButtonShare
                onClick={(e) => handleGoBack(e)}
                btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
                textClasses="px-4 cLT-white-text fLT-Regular-sC"
                innerText=" رجــوع"
              />
            </div> */}
          {/* </div> */}

          {/* [Request Button */}

          {/* </div> */}
        </div>

        {/* Upload Files [Holder] */}
        <div className="pb-4">
          <Upload
            inputRef={inputRef}
            isDrop={fileHandler}
            targetClick={filePicker}
            fileArr={filenames}
            handleDelete={handleDelete}
            uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
            noHover
          />
        </div>

        <LocationHandler
          country={selectedCountry?.name}
          city={selectedCity?.name}
          state={selectedState?.name}
          area={selectedArea?.name}
          setState={() => setLocationState(!locationState)}
        />
        {locationState && (
          <div>
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
                {errMessage?.country_id && (
                  <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.country_id}
                  </p>
                )}
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
                {errMessage?.city_id && (
                  <p
                    className="mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                    style={{ bottom: "-27px" }}
                  >
                    {errMessage?.city_id}
                  </p>
                )}
              </Form.Group>
            </Row>
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
                {errMessage?.country_id && (
                  <p className=" mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.country_id}
                  </p>
                )}
              </Form.Group>
              {/* State [Section] */}
              <Form.Group as={Col} md={6} className="mb-3 position-relative">
                {/* State [Option]  */}
                <div
                  className={`${
                    selectedArea?.id == "0" ? "d-none" : ""
                  } uLT-bd-f-platinum-sA uLT-f-radius-sB cLT-main-text fLT-Regular-sB LT-edit-account-input`}
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

                <div
                  className={`${
                    selectedArea?.id == "0" ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                >
                  <Form.Control
                    hidden={selectedArea?.id != "0"}
                    name="area_name"
                    className="uLT-bd-f-platinum-sA inpBG inp my-3"
                    type="text"
                    placeholder="ادخل اسم الحي"
                    onChange={(e) => setSelectedAreName(e.target.value)}
                  />

                  <p
                    onClick={() => setSelectedArea(null)}
                    style={{ fontFamily: "sans-serif" }}
                    className="m-0 mx-2 cu-pointer text-danger fs-5 fw-bold"
                  >
                    X
                  </p>
                </div>

                {errMessage?.city_id && (
                  <p
                    className=" mb-0 fLT-Regular-sA cLT-danger-text  px-2"
                    style={{ bottom: "27px" }}
                  >
                    {errMessage?.city_id}
                  </p>
                )}
              </Form.Group>
            </Row>
          </div>
        )}

        <div
          className={`d-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse`}
        >
          <div className="">
            <ButtonShare
              type={disable}
              onClick={(e) => handleCLick(e)}
              innerText={"إرسال"}
              loading={advsCheck}
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

export default OfferPriceForm;
