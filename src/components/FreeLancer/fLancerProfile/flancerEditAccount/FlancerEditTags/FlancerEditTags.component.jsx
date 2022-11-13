import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { getCategoryValue } from "../../../../../core/redux/reducers/CategoryReducer.core";
import { getMessages } from "../../../../../core/redux/reducers/Messages/Messages.core";
import { getRegisterCategoryValue } from "../../../../../core/redux/reducers/RegisterReducer/RegisterCategory.core";
import { deleteBasicData } from "../../../../../core/services/MethodDeleteGlobal/MethodDeleteGlobal.core";
import "./FlancerEditTags.component.scss";
const FlancerEditTagsComponent = ({
  tagDescription,
  tags,
  userProfileTags,
  categoryClass,
  handleClicks,
  type,
  placeholder,
  anyJob,
}) => {
  const dispatch = useDispatch();
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

      paddingRight: 16,
      paddingTop: 10,
      paddingBottom: 10,
      borderColor: "#E9E9E9",
    }),
  };

  const [profileTags, setProfileTags] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    if (userProfileTags) {
      setProfileTags(userProfileTags);
      setSelectedValue(userProfileTags?.map((ele) => ele.id));
    }
  }, [userProfileTags]);
  const handleChange = (e) => {
    setSelectedValue([
      ...profileTags.map((ele) => ele.id),
      ...e.map((x) => x.id),
    ]);
    setSelectedTags(e.map((x) => x));
  };
  useEffect(() => {
    if (anyJob) {
      setSelectedTags([...selectedTags, { id: 0, name: "اي شغل" }]);
      setSelectedValue([0]);
    }
  }, [anyJob]);
  const postCategory = useCallback(() => {
    if (type === "Register") {
      dispatch(getRegisterCategoryValue(selectedValue));
    } else {
      dispatch(getCategoryValue(selectedValue));
    }
  }, [dispatch, selectedValue, type]);
  useEffect(() => {
    postCategory();
  }, [postCategory]);

  const handleClick = (id) => {
    const holderID = document.getElementById(id);
    holderID.remove();
  };
  const handleDelete = (id) => {
    setProfileTags(profileTags.filter((ele) => ele.id != id));
    setSelectedValue(selectedValue.filter((ele) => ele != id));
  };
  return (
    <div>
      {/* Tags [Holder] */}
      <div className={`d-grid   ${categoryClass} `}>
        {/* [Description] */}
        <p className="m-0 mb-0 w-75 fLT-Regular-sB cLT-smoke-text">
          {" "}
          {tagDescription}{" "}
        </p>
        {/* [Tags Choose] */}
        <Select
          value={selectedTags}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          form="requird"
          isClearable
          theme={theme}
          placeholder={placeholder ? placeholder : "ادخل المهارات هنا"}
          isOptionSelected={true}
          styles={customStyles}
          isMulti
          menuShouldScrollIntoView={true}
          options={tags}
          onChange={handleChange}
          getOptionLabel={(tags) => tags?.name}
          getOptionValue={(tags) => tags?.id}
          noOptionsMessage={() => (
            <p
              className="mb-0 d-flex align-items-center justify-content-center fLT-Regular-sC  w-100"
              style={{ height: "50px", overflow: "hidden" }}
            >
              'لا يوجد مصنفات'
            </p>
          )}
        />
        <div className="d-flex gap-3 mt-3 pb-3 overflow-auto">
          {profileTags?.map((tag, idx) => {
            return (
              <div
                key={tag?.id}
                id={tag?.id}
                className="css-4vit6s-multiValue d-flex"
                style={{ width: "fit-content", height: "fit-content" }}
              >
                <div className="css-12jo7m5 d-flex justify-content-center align-items-center">
                  <p className="m-0" style={{ whiteSpace: "nowrap" }}>
                    {tag?.name}
                  </p>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  className="css-o833bd"
                  onClick={(e) => handleDelete(tag?.id)}
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
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlancerEditTagsComponent);
