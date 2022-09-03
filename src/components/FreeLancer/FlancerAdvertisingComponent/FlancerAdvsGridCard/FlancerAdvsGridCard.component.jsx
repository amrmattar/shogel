import "./FlancerAdvsGridCard.component.scss";
import AdvsImage from "../../../../assets/images/Advs-image.webp";
import FlancerPersonalInformationComponent from "../../fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component";
import { useLocation } from "react-router-dom";
const FlancerAdvsGridCards = ({ data }) => {
  const location = useLocation();
  return (
    <>
      {/* Advertising Cards */}
      <div
        className="uLT-f-radius-sB p-3 h-100 cLT-white-bg "
        style={{ width: " 100%" }}
      >
        {/* Advs Image [Section] */}
        {!data?.document[0]?.file.match(".mp4") ? (
          data?.document[0]?.file ? (
            <picture className="LT-advsListCard-img ">
              <img
                src={data?.document[0]?.file}
                alt=""
                width={"100%"}
                style={{
                  height: "177px",
                  borderRadius: "10px",
                  aspectRatio: "1/1",
                }}
              />
            </picture>
          ) : (
            <div
              style={{ width: "100%", height: "177px" }}
              className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
            ></div>
          )
        ) : (
          <video width="216" height="500" controls autoPlay={true}>
            <source src={data?.document[0]?.file} type="video/mp4" />
          </video>
        )}
        {/* Card Info */}
        <div className="card-body px-0 pt-2 pb-0 d-flex gap-2 justify-content-between align-items-start">
          <div className="d-flex h-100 p-0">
            <FlancerPersonalInformationComponent myData={data?.user} />
          </div>
          <div className="d-flex align-items-center fLT-Regular-sB">
            <p className="m-0 card-text cLT-support2-text ">
              ({data?.user?.rate?.count})
            </p>
            <p className="m-0 card-text cLT-support2-text ">
              {data?.user?.rate?.rate}
            </p>
            <i className={` iLT-Rate-star uLT-img-contain iLT-sA me-1 `}></i>
          </div>
          {/* Card Rate */}
        </div>
        {/* Card Divied */}
        <div className="uLT-bd-b-platinum-sA mx-3 my-2"></div>
        <div
          className="d-flex flex-column gap-3 justify-content-between "
          style={{ minHeight: "129px" }}
        >
          {/* Card title */}
          <div className="">
            <p className="m-0 pb-2  fLT-Bold-sm-sA cLT-support2-text">
              {data?.name}
            </p>
            <p
              className={`m-0 ${
                location.pathname === "/" ? "w-100" : ""
              } fLT-Regular-sA cLT-smoke-text LT-advsCategory-ellipsis`}
              dangerouslySetInnerHTML={{
                __html:
                  data?.description !== "undefined"
                    ? data?.description
                    : "لايوجد وصف للإعلان",
              }}
            ></p>
          </div>
          {/* Card Amenties */}
          <div className="d-flex align-items-center px-0">
            <div className="d-flex justify-content-center aling-items-center ps-4">
              <i
                className={` iLT-Advs-ksa-currency uLT-img-contain iLT-sA ms-2`}
              ></i>
              <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
                {" "}
                <span> {data?.price} </span> {data?.currency?.name}
              </p>
            </div>
            <div className="d-flex justify-content-center aling-items-center">
              <i
                className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2`}
              ></i>
              <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA">
                قبل {data?.created_at_value}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlancerAdvsGridCards;
