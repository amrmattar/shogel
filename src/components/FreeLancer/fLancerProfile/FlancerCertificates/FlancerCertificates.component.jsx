import React, { useEffect, useState } from "react";
import cls from "./FlancerCertificates.component.module.scss";

import ImgsViewer from "./ImgsViewer";
import { useMemo } from "react";

const Slide = ({ slide, offset, clickable, setSelectedImg, isImg }) => {
  const active = offset === 0 ? true : null;

  const openImg = () => {
    const ext = slide.file.split(".").at(-1).toLowerCase();

    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
      setSelectedImg(slide.file);
    }
  };

  return (
    <div
      className={cls.slide}
      data-active={active}
      style={{
        "--offset": offset * 1.05 - 0.3,
        "--dir": 0,
        backgroundImage: `url('${
          isImg ? slide.file : "/MicrosoftTeams-image.png"
        }')`,
        cursor: clickable ? "pointer" : "",
      }}
      onClick={isImg && clickable ? openImg : () => window.open(slide?.file)}
    />
  );
};

function FlancerCertificatesComponent({ certificatesData, clickable }) {
  const [state, setState] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectImgHandelar = (img) => {
    setIsOpen(true);
    setSelectedImg(img);
  };

  const Imgs = useMemo(
    () =>
      certificatesData.map((certificate) => {
        return { src: certificate.file };
      }),
    [certificatesData]
  );

  const nextImg = () => {
    const currentImgIdx = Imgs.findIndex((img) => {
      console.log(img.src, selectedImg);

      return img.src === selectedImg;
    });

    if (Imgs[currentImgIdx + 1]) {
      setSelectedImg(Imgs[currentImgIdx + 1]?.src);
    }
  };

  const prevImg = () => {
    const currentImgIdx = Imgs.findIndex((img) => img.src === selectedImg);

    if (Imgs[currentImgIdx - 1]) {
      setSelectedImg(Imgs[currentImgIdx - 1]?.src);
    }
  };

  useEffect(() => {
    if (clickable && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [clickable, isOpen]);

  const isExImg = (ex) => {
    if (
      ex?.toLowerCase() === "png" ||
      ex?.toLowerCase() === "jpg" ||
      ex?.toLowerCase() === "jpeg"
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      {clickable && (
        <ImgsViewer
          imgs={Imgs}
          currImg={selectedImg}
          isOpen={isOpen}
          onClickPrev={prevImg}
          onClickNext={nextImg}
          onClose={() => setIsOpen(false)}
          backdropCloseable={true}
        />
      )}

      <div className={cls.main}>
        <div className={cls.slides}>
          {certificatesData.map((slide, i) => {
            let offset = state - i;

            return (
              <Slide
                isImg={isExImg(slide?.file?.split(".").at(-1))}
                clickable={clickable}
                setSelectedImg={selectImgHandelar}
                slide={slide}
                offset={offset}
                key={i}
              />
            );
          })}
        </div>
        <button
          onClick={() => setState((state + 1) % certificatesData.length)}
          className={cls.next}
        >
          ›
        </button>
        <button
          className={cls.prev}
          onClick={() =>
            setState(state === 0 ? certificatesData.length - 1 : state - 1)
          }
        >
          ‹
        </button>
      </div>
    </>
  );
}

// const FlancerCertificatesComponent = ({ certificatesData }) => {
//   const [targetIndx, setTargetIndx] = useState(1);
//   const eleRef = useRef();
//   const handleClick = () => {
//     setTargetIndx(
//       targetIndx == certificatesData.length - 1 ? 0 : targetIndx + 1
//     );

//     eleRef.current.scrollTo(2, 0);
//   };
//   return (
//     <div ref={eleRef} className={cls.container}>
//       {certificatesData.map((ele, indx) => (
//         <ImageComp indx={indx} targetIndx={targetIndx} ele={ele} />
//       ))}
//       <button onClick={handleClick}> click me</button>
//     </div>
//   );
// };
// const ImageComp = ({ ele, indx, targetIndx }) => {
//   return (
//     <div className={cls.imageCont}>
//       <img

//         className={targetIndx == indx ? cls.targetImg : cls.sideImg}
//         src={ele.file}
//       />
//     </div>
//   );
// };
export default FlancerCertificatesComponent;
// const [slideIn, setSlide] = useState(0);
// useEffect(() => {
//   certificatesData?.map((el, idx) => {
//     setSlide(idx);
//   });
// }, [certificatesData]);
// return (
//   <div className="container">
//     {certificatesData?.length !== 0 ? (
//       <Carousel
//         keyboard={true}
//         indicators={slideIn <= 0 ? false : true}
//         interval={null}
//         slide={true}
//         controls={slideIn <= 0 ? false : true}
//         touch={true}
//       >
//         {certificatesData?.map((elmFile, idx) => {
//           return (
//             <Carousel.Item key={idx}>
//               {elmFile.file.match(".mp4") ? (
//                 <video
//                   width="100%"
//                   style={{ height: "450px" }}
//                   controls
//                   autoPlay={true}
//                 >
//                   <source src={elmFile?.file} type="video/mp4" />
//                 </video>
//               ) : (
//                 <picture className="LT-advsListCard-img">
//                   <img
//                     style={{ height: "450px" }}
//                     src={elmFile?.file}
//                     alt=""
//                     width={"100%"}
//                   />
//                 </picture>
//               )}
//             </Carousel.Item>
//           );
//         })}
//       </Carousel>
//     ) : (
//       <div
//         className="d-flex flex-column justify-content-center align-items-center w-100  "
//         style={{ height: "100% " }}
//       >
//         <div
//           className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
//           style={{ width: "200px", height: "200px" }}
//         ></div>
//         <p className="mb-0 fLT-Bold-sD cLT-gray-text">
//           لا يوجد صور أو فيدوهات
//         </p>
//       </div>
//     )}
//   </div>
// );
