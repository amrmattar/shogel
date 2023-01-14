import { useCallback, useEffect, useState } from "react";
import "./FlancerAdvsTitle.component.scss";

const FlancerAdvsTitle = ({ data }) => {
  // const [sectionFourData, setSectionFourData] = useState({title:''})
  // const handleSectionOne = useCallback(
  //   () => {
  //     data?.map((homeData) => {
  //         if(homeData?.section === '4') {
  //             switch (homeData?.key) {
  //                 case 'home_section_4_title':
  //                     return  setSectionFourData(sectionFourData => ({...sectionFourData, title: homeData.value}))
  //                 default:
  //                     return false
  //             }
  //         }
  //     })
  //   },
  //   [data],
  // )
  // useEffect(() => {
  //     let cancel = false
  //     if(cancel) return;
  //   handleSectionOne()
  //   return () => {
  //     cancel = true
  //   }
  // }, [handleSectionOne])
  return (
    <div className="d-flex flex-column align-items-center pb-4 text-center">
      <p className={"homeTilteGreen"}>بعض الخدمات وظائف شغل</p>
      <p className={"homeTitleBlack"}>
        اهم الخدمات الاحترافية لتطوير وتنمية اعمالك
      </p>
    </div>
  );
};

export default FlancerAdvsTitle;
