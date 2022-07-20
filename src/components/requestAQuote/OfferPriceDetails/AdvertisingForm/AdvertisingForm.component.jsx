import "./AdvertisingForm.component.scss";
import ButtonShare from "../../../../shared/Button/Button.shared";
import Upload from "../../../../shared/Upload/Upload.shared";
import Progress from "../../../../shared/Upload/Progress/Progress";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlancerEditTagsComponent from "../../../FreeLancer/fLancerProfile/flancerEditAccount/FlancerEditTags/FlancerEditTags.component";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { userProfile } from "../../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { useNavigate } from "react-router-dom";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import TextEditorShared from "../../../../shared/TextEditor/TextEditor.shared";
  import { toast } from "react-toastify";

const AdvertisingFormComponent = () => {
  const [getAllUserUpdate, messages] = useSelector((state) => [
    state.profileUpdate,
    state.messages,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errMessage = messages[0]?.messages;
  const [userCategory, setUserCategory] = useState();
  const userLoginData = useMemo(() => {
    return userProfile
      ._GET_ProfileByToken(localStorage.getItem("userTK"))
      .then((res) => {
        setUserCategory(res.data.data?.category);
      });
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
       toast.error("حدث خطأ ما")
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

  const backButton = useRef();
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const advsMaxCharacters = 5000;

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
        className="LT-advs-form-grid py-4 mt-4 px-4"
      >
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
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                {" "}
                عنوان الاعلان
              </Form.Label>
              <Form.Control
                value={formData?.name}
                name="name"
                onChange={handleChange}
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="text"
                placeholder="علي سبيل المثال , ببناء موقع علي شبكة الانترنت"
              />
              <div>
                {errMessage?.name && (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text pt-2¬ px-2">
                    {errMessage?.name}
                  </p>
                )}
              </div>
            </Form.Group>
            <Form.Group
              as={Col}
              sm={12}
              md={6}
              controlId="formGridPassword"
              className="position-relative px-0 d-grid gap-2"
            >
              <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
                {" "}
                السعر
              </Form.Label>
              <Form.Control
                value={formData?.price}
                name="price"
                onChange={handleChange}
                className="uLT-bd-f-platinum-sA uLT-f-radius-sB"
                type="number"
                placeholder="0 ريال"
              />
              <div>
                {errMessage?.price && (
                  <p className="position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                    {errMessage?.price}
                  </p>
                )}
              </div>
            </Form.Group>
          </div>
        </Row>
        {/* Details Request [Section] */}
        {/* <div className="LT-details-advs position-relative">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fLT-Bold-sA cLT-main-text m-0">اكتب تفاصيل الاعلان</label>
                    <textarea
                        className="form-control fLT-Regular-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text" rows="3" placeholder="صف مشروعك هنا"
                        name='description'
                        onChange={handleChange}
                        value={formData?.description}
                    ></textarea>
                    <div className="text-start w-100 cLT-smoke-text">
                        {formData.description.length} /  {advsMaxCharacters}
                    </div>
                    <div >
                        {errMessage?.description && <p className=' position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2'>{errMessage?.description}</p>}
                    </div>
                </div> */}
        {/* Details Request [Section] */}
        <div className="LT-details-request position-relative">
          <Form.Label className="form-label fLT-Bold-sA cLT-main-text m-0">
            {" "}
            اكتب تفاصيل الطلب
          </Form.Label>
          <TextEditorShared
            setDescription={setContent}
            setMaxLength={setGetDescriptionLength}
            characterLength={advsMaxCharacters}
          />
          <div className="text-start w-100 cLT-smoke-text">
            {getDescriptionLength} / {advsMaxCharacters}
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
            fileArr={filenames}
            handleDelete={handleDelete}
            uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
          />
        </div>
        {/* Skills-Grid [Holder] */}
        <div className="d-grid  position-relative">
          {/* [Title] */}
          <p className="m-0 fLT-Bold-sA cLT-main-text">
            اختر <span className="cLT-support1-text"> المجالات</span> المناسبة
            لاعلانك
          </p>
          <FlancerEditTagsComponent
            categoryClass={"pb-0"}
            tags={userCategory}
          />
          <div>
            {errMessage?.category && (
              <p className=" position-absolute mb-0 fLT-Regular-sA cLT-danger-text  px-2">
                {errMessage?.category}
              </p>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          {/* [Back Button */}
          <div className="d-flex justify-content-end  align-items-left">
            <div className="shadow uLT-f-radius-sB" ref={backButton}>
              <ButtonShare
                onClick={(e) => handleGoBack(e)}
                btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
                textClasses="px-4 cLT-white-text fLT-Regular-sC"
                innerText=" رجــوع"
              />
            </div>
          </div>

          {/* [Request Button */}
          <div className="d-flex justify-content-end  align-items-left">
            <div className="shadow uLT-f-radius-sB">
              <ButtonShare
                loading={advsCheck}
                btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
                textClasses="px-4 cLT-white-text fLT-Regular-sC"
                innerText=" إرسال"
              />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default AdvertisingFormComponent;
