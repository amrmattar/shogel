import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDescription } from "../../../../core/redux/reducers/UpdateProfileReducer/UpdateProfileReducer.core";

const FlancerAboutComponent = ({ about, data }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const getAboutMe = useCallback(
    (e) => {
      dispatch(getDescription(info ? info : data));
    },
    [dispatch, info]
  );
  useEffect(() => {
    getAboutMe();
  }, [getAboutMe]);

  return (
    <div>
      {/* Freelancer About [Section] */}
      {about === "about" && (
        <article
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
          dangerouslySetInnerHTML={{
            __html: data || "<span>لا يوجد وصف</span>",
          }}
          className="m-0 fLT-Regular-sB cLT-smoke-text "
        />
      )}
      {/* Freelancer About Edit  [Section] */}
      {about === "editAbout" && (
        <div className="">
          <textarea
            onChange={(e) => setInfo(e?.target?.value)}
            defaultValue={data}
            className="form-control fLT-Regular-sB p-3 uLT-bd-f-platinum-sA fLT-Regular-sB cLT-main-text"
            rows="3"
            placeholder="اكتب هنا"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default FlancerAboutComponent;
