import "./FlancerCertificates.component.scss";
import advsimg from "../../../../assets/images/contact-us-image.webp";
import { useEffect, useMemo, useState } from "react";
import imge from "../../../../assets/images/Electronic.png";
import secimge from "../../../../assets/images/deadline.svg";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const FlancerCertificatesComponent = ({ certificatesData }) => {
  const [slideIn, setSlide] = useState(0);
  useEffect(() => {
      certificatesData?.map((el, idx) => {
      setSlide(idx);
    });
  }, [certificatesData]);
  return (
    <div className="container">
      {certificatesData?.length !== 0 ? (
          <Carousel
          keyboard={true}
          indicators={slideIn <= 0 ? false : true}
          interval={null}
          slide={true}
          controls={slideIn <= 0 ? false : true}
          touch={true}
        >
          {certificatesData?.map((elmFile, idx) => {
              return (
              <Carousel.Item key={idx}>
                {elmFile.file.match(".mp4") ? (
                  <video
                    width="100%"
                    style={{ height: "450px" }}
                    controls
                    autoPlay={true}
                  >
                    <source src={elmFile?.file} type="video/mp4" />
                  </video>
                ) : (
                    <picture className="LT-advsListCard-img">
                    <img
                      style={{ height: "450px" }}
                      src={elmFile?.file}
                      alt=""
                      width={"100%"}
                    />
                  </picture>
                )}
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
          <div
          className="d-flex flex-column justify-content-center align-items-center w-100  "
          style={{ height: "100% " }}
        >
          <div
            className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
            style={{ width: "200px", height: "200px" }}
          ></div>
          <p className="mb-0 fLT-Bold-sD cLT-gray-text">
            لا يوجد صور أو فيدوهات
          </p>
        </div>
      )}
    </div>
  );
};
export default FlancerCertificatesComponent;

//   const [targetIndx, setTargetIndx] = useState(1);

//   return (
//     <div>
//       {certificatesData.map((ele) => (
//         <ImageComp targetIndx={targetIndx} ele={ele} />
//       ))}
//     </div>
//   );
// };
// const ImageComp = ({ ele, targetIndx}) => {
//   return (
//     <div>
//       <img width="100px" src={ele.file} />
//     </div>
//   );