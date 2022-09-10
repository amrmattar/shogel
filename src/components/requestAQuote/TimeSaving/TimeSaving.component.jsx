import "./TimeSaving.component.scss";
import deadLine from "../../../assets/images/deadline.svg";
import workVid from "../../../assets/icons/workSite.mp4";
import { useCallback, useEffect, useState } from "react";
const TimeSaving = ({ data }) => {
  const times = [
    {
      iconName: deadLine,
      timeDescription: `لتبسيط نجاحك في العمل والحياة
      الأفضل لكل ميزانية ابحث عن خدمات عالية الجودة في كل نقطة
      `,
    },
    {
      iconName: deadLine,
      timeDescription: `
      لتبسيط نجاحك في العمل والحياة
الأفضل لكل ميزانية ابحث عن خدمات عالية الجودة في كل نقطة
`,
    },
  ];
  const [sectionTwoData, setSectionTwoData] = useState({ video: "" });
  const [video, setVideo] = useState("");
  const handleSectionOne = useCallback(() => {
    data?.map((homeData) => {
      if (homeData?.section === "2") {
        switch (homeData?.key) {
          case "home_section_2_video_link":
            return setSectionTwoData((sectionTwoData) => ({
              ...sectionTwoData,
              video: homeData.value,
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
  useEffect(() => {
    if (sectionTwoData?.video) {
      let str = sectionTwoData.video.replace("watch?v=", "embed/");
      let str2 = str.replace("&t=150s", "");
   
      setVideo(str2);
    }
  }, [sectionTwoData]);
  return (
    // Time Saving [Holder]
    <div className="p-3 p-sm-4 LT-time-save-grid-holder">
      {/* Time Saving Section [Video] */}
      <div style={{ backgroundColor: "gray" }} className="LT-video-grid w-100 ">
      
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          src={video}
          frameborder="0"
          type="video/mp4"
          allowfullscreen
        ></iframe>
      </div>
      {/* Time Saving Section [List] */}
      <div className="w-100 LT-time ">
        {times.map((time, ix) => {
          return (
            // {/* Time Save Holder Loop */}
            <div
              key={ix}
              className="LT-time-box uLT-f-radius-sB uLT-bd-f-platinum-sB"
            >
              {/* Time Icon */}
              <picture className="d-flex flex-column align-items-center gap-2">
                <img src={time.iconName} alt="" width={50} height={50} />
                <p className="m-0 cLT-main-text fLT-Bold-sB text-nowrap">
                  توفير الوقت
                </p>
              </picture>
              <div className="LT-time-line cLT-platinum-bg uLT-f-radius-sB "></div>
              {/* Time Name */}
              <span className="LT-description-time-grid cLT-gray-text fLT-Bold-sB">
                {time.timeDescription}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimeSaving;
