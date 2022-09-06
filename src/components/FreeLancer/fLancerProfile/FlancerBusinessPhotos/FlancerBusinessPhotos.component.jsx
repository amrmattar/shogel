import React, { useRef, useState } from "react";
import { useEffect } from "react";
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
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles(data?.document);
  }, [data]);
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id != id));
  };
  const filePicker = (e) => {
    inputRef.current.click();
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
          isHaveData={files}
          fileArr={fileUpload}
          handleDelete={handleDelete}
          uploadDescription={`اسحب وافلت أي الصور او مستندات قد تكون مفيدة في شرح موجزك هنا (الحد الاقصي لحجم الملف:25 مبجا بايت)`}
        />
      </div>
    </>
  );
};

export default FlancerBusinessPhotosComponent;
