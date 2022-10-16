import Upload from "../../../../shared/Upload/Upload.shared";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { userOfferPrice } from "../../../../core/services/OfferPriceService/OfferPriceService.core";
import ButtonShare from "../../../../shared/Button/Button.shared";
import ReactStars from "react-rating-stars-component";
import { reviewsCore } from "../../../../core/services/Reviews/Reviews.core";

const FreelancerTaskView = ({ data, setLoading }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const media = new FormData();

  // TODO Function Execute When You Typing The Description And Reviews Comment  ** [Textarea] **
  const [jobTaskDone, setJobTaskDone] = useState({
    description: "",
    comment: "",
  });
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setJobTaskDone((jobTaskDone) => ({ ...jobTaskDone, [name]: value }));
  };
  // TODO Variable And State To Definition The Rating Icon And Action
  const [rateNumber, setRateNumber] = useState(1);
  const firstExample = {
    size: 30,
    count: 5,
    value: 1,
    edit: true,
    color: "#E9E9E9",
    isHalf: false,
    onChange: (newValue) => {
      setRateNumber(newValue);
    },
  };
  // TODO Function Execute To Definition Files Before Uploading By Choose Or Drag And Drop
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
  // TODO Function Execute To View Files After Upload At Spacific Place InnerHTML
  const filePicker = (e) => {
    inputRef.current.click();
    media.append("images", e.target?.files);
  };
  // TODO Function Execute To Remove Upload Files
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
  // TODO Function Execute To Collect  Business After Finish By Freelancer ** [Action Button] **
  const [taskFileCheck, setTaskFileCheck] = useState(false);
  const handleSendTaskFile = (e) => {
    e.preventDefault();
    dispatch(
      getMessages({
        messages: "جاري إرســـال طلبك",
        messageType: "warning",
        messageClick: true,
      })
    );
    setTaskFileCheck(true);
    // Collect Reviews Data To Post All
    const reviewData = {
      user_id: data?.user?.id,
      task_id: data?.id,
      review: rateNumber ? rateNumber : 1,
      comment: jobTaskDone?.comment,
    };
    // Get Files Upload [Image,Videos] And Decription
    file.images?.map((image, idx) => {
      return media.append(`done`, image);
    });
    file.videos?.map((video, idx) => {
      return media.append(`done`, video);
    });
    media.set("comment", jobTaskDone.description);
    userOfferPrice
      ._POST_FileDoneByfreelancer(data?.id, media)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res.data.message,
            messageType: "success",
            messageClick: true,
          })
        );
        if (res.data.status === 1) {
          reviewsCore._POST_Rating(reviewData);
        }
        setTaskFileCheck(false);
        setLoading(true);
      })
      .catch((err) => {
        dispatch(
          getMessages([
            {
              messages: err.response.data.message,
              messageType: "error",
              messageClick: true,
            },
          ])
        );
        setTaskFileCheck(false);
      });
  };
  return (
    <div className="d-flex flex-column gap-3">
      {" "}
      {/* Description [Holder] */}
      <div className="d-flex flex-column gap-3 position-relative mt-4">
        <Form.Label className="form-label fLT-Bold-sA cLT-support2-text m-0">
          {" "}
          تسليم الطلب
        </Form.Label>
        <textarea
          style={{ minHeight: "120px", resize: "unset" }}
          className=" form-control uLT-f-radius-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text"
          rows="1"
          placeholder="صف مشروعك هنا"
          name="description"
          maxLength={500}
          value={jobTaskDone?.description}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Upload Files [Holder] */}
      <div className="LT-upload-advs~ d-flex flex-column">
        <Upload
          inputRef={inputRef}
          isDrop={fileHandler}
          targetClick={filePicker}
          fileArr={filenames}
          handleDelete={handleDelete}
          changeStylrToAnotherComponnet={"taskComponent"}
          uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
        />
      </div>
      {/* Comment And Reviews [Holder] */}
      <div className="d-flex flex-column gap-2 position-relative mt-4">
        <Form.Label className="form-label fLT-Bold-sA cLT-support2-text m-0">
          {" "}
          تعليقك عن صاحب الطلب
        </Form.Label>
        <textarea
          style={{ minHeight: "120px", resize: "unset" }}
          className=" form-control uLT-f-radius-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text"
          rows="1"
          placeholder="صف تعليقك"
          name="comment"
          value={jobTaskDone?.comment}
          maxLength={500}
          onChange={handleChange}
        ></textarea>
      </div>
      <div
        className="d-flex align-items-center justify-content-center gap-3 gap-sm-0 justify-content-sm-between w-100 flex-wrap"
        dir="ltr"
      >
        <ReactStars {...firstExample} />
        <p className="mb-0 fLT-Regular-sD text-end cLT-gray-text">تقييــمك </p>
      </div>
      {/* [Action Button [Holder] */}
      <div className="d-flex justify-content-end  align-items-left">
        <div className="shadow uLT-f-radius-sB">
          <ButtonShare
            loading={taskFileCheck}
            onClick={handleSendTaskFile}
            btnClasses="cLT-secondary-bg py-2 px-4 uLT-f-radius-sB"
            textClasses="px-4 cLT-white-text fLT-Regular-sC"
            innerText=" تسليم الطلب"
          />
        </div>
      </div>
    </div>
  );
};

export default FreelancerTaskView;
