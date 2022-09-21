import cls from "./FlancerCertificates.component.module.scss";
import advsimg from "../../../../assets/images/contact-us-image.webp";
import React, { useEffect, useMemo, useRef, useState } from "react";
import imge from "../../../../assets/images/Electronic.png";
import secimge from "../../../../assets/images/deadline.svg";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image:
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image:
      "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
];

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  console.log(active ? slide : null);

  return (
    <div
      className={cls.slide}
      data-active={active}
      style={{
        "--offset": offset * 1.05 - 0.3,
        "--dir": 0,
        backgroundImage: `url('${slide.file}')`,
      }}
    ></div>
  );
}

function FlancerCertificatesComponent({ certificatesData }) {
  const [state, setState] = useState(0);

  return (
    <div className={cls.main}>
      <div className={cls.slides}>
        {certificatesData.map((slide, i) => {
          let offset = state - i;
          return <Slide slide={slide} offset={offset} key={i} />;
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
