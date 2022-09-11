import "./AboutUs.component.scss";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import ButtonShare from "../../shared/Button/Button.shared";
import { NavLink } from "react-router-dom";
// import imgs from "../../assets/images/aboutUs-image.webp"
const AboutUs = ({ data }) => {
  const aboutUSAmenties = [
    {
      iconName: "iLT-aboutUs-new",
      title: "مفهوم جديد",
    },
    {
      iconName: "iLT-aboutUs-suitcase",
      title: "حرية في التعامل",
    },
    {
      iconName: "iLT-aboutUs-clock",
      title: "تثمين للوقت",
    },
    {
      iconName: "iLT-aboutUs-service",
      title: "شمولية في الخدمات",
    },
  ];
  const [sectionOneData, setSectionOneData] = useState({
    title: "",
    decription: "",
    image: "",
    link: "",
  });
  const handleSectionOne = useCallback(() => {
    data?.map((homeData) => {
      if (homeData?.section === "1") {
        switch (homeData?.key) {
          case "home_section_1_title":
            return setSectionOneData((sectionOneData) => ({
              ...sectionOneData,
              title: homeData.value,
            }));
          case "home_section_1_description":
            return setSectionOneData((sectionOneData) => ({
              ...sectionOneData,
              decription: homeData.value,
            }));
          case "home_section_1_image":
            return setSectionOneData((sectionOneData) => ({
              ...sectionOneData,
              image: homeData.value,
            }));
          case "home_section_1_link":
            return setSectionOneData((sectionOneData) => ({
              ...sectionOneData,
              link: homeData.value,
            }));
          default:
            return false;
        }
      }
    });
  }, [data]);
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    handleSectionOne();
    return () => {
      cancel = true;
    };
  }, [handleSectionOne]);
  return (
    <Fragment>
      <>
        <section
          className="imLT-aboutUs-ima~ge uLT-img-cover cLT-white-text position-relative"
          style={{ zIndex: "1", height: "100%" }}
        >
          <img
            src={sectionOneData?.image}
            alt=""
            className="LT-image-holder"
            width={"100%"}
            style={{
              height: "100%",
              position: "absolute",
              top: "0px",
              right: "0px",
              zIndex: "-1",
            }}
          />
          {/* About Us [Holder] */}
          <section className="container-sm h-100 py-3 d-flex flex-column">
            <section className=" d-flex flex-column align-items-start h-100 justify-content-center  px-md-0">
              {/* About Us Title */}
              <p
                className="m-0 LT-about-title fLT-Bold-sD pb-3"
                dangerouslySetInnerHTML={{ __html: sectionOneData?.title }}
              ></p>
              {/* About Us Description */}
              <p
                className="m-0 fLT-Regular-sD LT-para-holder "
                dangerouslySetInnerHTML={{ __html: sectionOneData?.decription }}
              ></p>
              {/* About Button */}
              <section className="d-flex justify-content-center align-items-center shadow uLT-f-radius-sB my-3">
                <NavLink
                  to={sectionOneData?.link}
                  className="shadow uLT-f-radius-sB"
                >
                  <ButtonShare
                    btnClasses="cLT-white-bg py-2 uLT-f-radius-sB px-4"
                    textClasses="cLT-main-text fLT-Regular-sB px-4"
                    innerText="عن المنصة"
                  />
                </NavLink>
              </section>
            </section>
            {/* About Us Amenties [Loop] */}
            <section className="LT-card-grid-holder-slider  me-md-3 my-md-3 ">
              {aboutUSAmenties.map((amenties, ix) => {
                return (
                  <div
                    key={ix}
                    className="d-flex align-items-center gap-3 justify-content-start px-md-0"
                  >
                    <i
                      className={`${amenties.iconName} d-block uLT-img-contain LT-amenties-icon-size `}
                    ></i>
                    <p className="m-0 LT-amenties-text cLT-white-text text-nowrap">
                      {amenties.title}
                    </p>
                  </div>
                );
              })}
            </section>
          </section>
        </section>
      </>
    </Fragment>
  );
};
export default AboutUs;
