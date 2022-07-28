import $ from "jquery";
import "./Upload.shared.scss";
import React, { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import Progress from "./Progress/Progress";

const Upload = ({
  uploadDescription,
  targetClick,
  isDrop,
  inputRef,
  fileArr,
  handleDelete,
  isHaveData,
  changeStylrToAnotherComponnet,
}) => {
  const handleOpen = (e, files) => {
    if (e.target.tagName === "svg" && e.target.tagName === "path") {
    }
  };
  return (
    <>
      <p className="m-0 py-2 fLT-Bold-sA mb-0">الصور والملفات</p>
      <FileDrop onTargetClick={(f) => targetClick(f)} onDrop={(f) => isDrop(f)}>
        {changeStylrToAnotherComponnet !== "taskComponent" ? (
          <div className="inpBG inpH2 d-flex flex-column flex-sm-row py-4 py-sm-0 justify-content-between px-3 align-items-center uLT-f-radius-sB uLT-bd-f-platinum-sA">
            <p className="m-0 px-0 uLT-r-radius-sA fLT-Regular-sB cLT-main-text border-0">
              {uploadDescription}
            </p>
            <div
              className={`uLT-click d-flex justify-content-center align-items-center uLT-f-radius-sB uLT-bd-f-gray-sA px-3`}
            >
              <i className="iLT-Add-items-black d-block uLT-img-contain iLT-sA"></i>
              <label
                htmlFor="attachment"
                className="btn fLT-Regular-sB px-2 cLT-support2-text text-nowrap"
              >
                تحميل الملفات
              </label>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column flex-sm-row  justify-content-end px-2 py-3 align-items-center uLT-f-radius-sB uLT-bd-f-platinum-sA">
            <div
              className={`uLT-click d-flex justify-content-center align-items-center uLT-f-radius-sB uLT-bd-f-gray-sA px-3`}
            >
              <i className="iLT-Add-items-black d-block uLT-img-contain iLT-sA"></i>
              <label
                htmlFor="attachment"
                className="btn fLT-Regular-sB px-2 cLT-support2-text text-nowrap"
              >
                تحميل الملفات
              </label>
            </div>
          </div>
        )}
        <input
          accept=".xlsx,.xls,.doc,.csv,,.word,.gif,.pdf, image/*,video/mp4,video/x-m4v,video/*"
          value=""
          style={{ visibility: "hidden", opacity: 0, width: "0px" }}
          ref={inputRef}
          multiple="multiple"
          type="file"
          onClick={(e) => targetClick(e.target.files)}
          onChange={(e) => isDrop(e.target.files)}
        />
      </FileDrop>
      <div
        className={`${
          changeStylrToAnotherComponnet == "taskComponent" &&
          fileArr?.length !== 0
            ? "LT-grid-file"
            : "LT-receiveProgress"
        }  `}
      >
        {isHaveData &&
          isHaveData?.map((oldFile, idx) => {
            return (
              <div
                id="responseUploadData"
                className="uLT-click"
                key={idx}
                onClick={(e) => handleDelete(e, oldFile?.file, oldFile?.id)}
              >
                <Progress
                  name={oldFile.file.slice(62)}
                  icon={oldFile.file.split(".")[3]?.toUpperCase().trim()}
                />
              </div>
            );
          })}
        {fileArr &&
          fileArr?.map((file, idx) => (
            <div
              id="staticDataUpload"
              key={idx}
              className=""
              onClick={(e) => handleDelete(e, file?.name, idx)}
            >
              <Progress
                name={file.name || file?.file}
                icon={
                  file.icon || file?.file?.split(".")[3]?.toUpperCase().trim()
                }
                handleClick={(e) => handleOpen(e, file.file)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Upload;
