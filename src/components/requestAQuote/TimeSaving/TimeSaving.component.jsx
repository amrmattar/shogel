import "./TimeSaving.component.scss";
import deadLine from "../../../assets/images/deadline.svg"
import workVid from "../../../assets/icons/workSite.mp4"
import { useCallback, useEffect, useState } from "react";
const TimeSaving = ({data}) => {
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
  const [sectionTwoData, setSectionTwoData] = useState({video:'', })
  const handleSectionOne = useCallback(
    () => {
      data?.map((homeData) => {
          if(homeData?.section === '2') {
              switch (homeData?.key) {
                  case 'home_section_2_video_link':
                      return  setSectionTwoData(sectionTwoData => ({...sectionTwoData, video: homeData.value}))
                  default:
                      return false
              }
          }
      })
    },
    [data],
  )
  useEffect(() => {
      let cancel = false
      if(cancel) return;
    handleSectionOne()
    return () => {
      cancel = true
    }
  }, [handleSectionOne])
  return (
    // Time Saving [Holder]
    <div className="p-3 p-sm-4 LT-time-save-grid-holder">
      {/* Time Saving Section [Video] */}
      <div className="LT-video-grid w-100 ">
        <video width="100%" height="100%" controls loop autoPlay style={{height:'100%', objectFit:'cover', borderRadius: '16px'}}>
          <source src={sectionTwoData?.video} type="video/mp4" />
        </video>
      </div>
      {/* Time Saving Section [List] */}
      <div className="w-100 LT-time ">
        {times.map((time, ix) => {
          return (
            // {/* Time Save Holder Loop */}
            <div key={ix} className="LT-time-box uLT-f-radius-sB uLT-bd-f-platinum-sB">
              {/* Time Icon */}
              <picture className="d-flex flex-column align-items-center gap-2">
                <img src={time.iconName} alt="" width={50} height={50} />
                <p className="m-0 cLT-main-text fLT-Bold-sB text-nowrap">توفير الوقت</p>
              </picture>
              <div className="LT-time-line cLT-platinum-bg uLT-f-radius-sB "></div>
              {/* Time Name */}
              <span className="LT-description-time-grid cLT-gray-text fLT-Bold-sB">{time.timeDescription}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimeSaving;
