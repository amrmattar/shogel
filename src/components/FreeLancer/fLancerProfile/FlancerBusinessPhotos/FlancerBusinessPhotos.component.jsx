import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSocialMedia } from "../../../../core/redux/reducers/SocialMediaReducer.core";
import { deleteBasicData } from "../../../../core/services/MethodDeleteGlobal/MethodDeleteGlobal.core";
import { updateProfile } from "../../../../core/services/userProfile/UpdateProfile/UpdateProfile.core";
import Upload from "../../../../shared/Upload/Upload.shared";

const FlancerBusinessPhotosComponent = ({
  data,
  Sdelet,
  handleClick,
  fileUpload,
}) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const docData = new FormData();
  const [newfile, setFiles] = useState({ images: [], videos: [] });
  const [filenames, setNames] = useState([]);
  const fileHandler = (files) => {
    const extention = files;
    for (let allFile of extention) {
      if (allFile.type.match("video/")) {
        dispatch(getSocialMedia({ document: allFile }));
        newfile.videos.push(allFile);
      } else if (allFile.type.match("image/")) {
        dispatch(getSocialMedia({ document: allFile }));
        newfile.images.push(allFile);
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
    if (
      e.nativeEvent.path[4].id === "responseUploadData" ||
      e.nativeEvent.path[5].id === "responseUploadData"
    ) {
      deleteBasicData._Delete_Data(i).then((res) => {
        return res;
      });
    }
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
    // offerPrice.append('images', e.target?.files)
  };
  return (
    <>
      {/* Upload Files [Holder] */}
      {/* Upload Files [Holder] */}
      <div className="">
        <Upload
          inputRef={inputRef}
          Sdelet={Sdelet}
          isDrop={handleClick}
          targetClick={filePicker}
          isHaveData={data?.document}
          fileArr={fileUpload}
          handleDelete={handleDelete}
          uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
        />
      </div>
    </>
  );
};

export default FlancerBusinessPhotosComponent;
