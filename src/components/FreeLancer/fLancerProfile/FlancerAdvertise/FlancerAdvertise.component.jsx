import React from "react";
import logoImageDefault from "../../../../assets/images/main-logo.svg";

const FlancerAdvertise = ({ data }) => {
  const handleClick = () => {};
  return (
    <div className="d-flex" onClick={() => handleClick()}>
      {/* Card Image */}
      <div className="" style={{ width: "258px", height: "168px" }}>
        {!data?.document[0]?.file.match(".mp4") ? (
          data?.document[0]?.file ? (
            <picture className=" ">
              <img
                src={data?.document[0]?.file}
                alt=""
                style={{ height: "100%", aspectRatio: "2/1" }}
                className=" img-fluid uLT-f-radius-sB"
              />
            </picture>
          ) : (
            <picture className="">
              <img
                src={logoImageDefault}
                alt=""
                style={{ height: "100%", aspectRatio: "2/1" }}
                className=" uLT-f-radius-sB img-fluid"
              />
            </picture>
          )
        ) : (
          <video width="100%" height="120" controls autoPlay={true}>
            <source src={data?.document[0]?.file} type="video/mp4" />
          </video>
        )}
      </div>
      {/* <div className="imLT-Advs-image uLT-img-cover uLT-f-radius-sB" style={{ width: "416px", height: "100%" }}></div> */}

      <div className="d-flex flex-column px-3 justify-content-center">
        {/* Card title */}
        <div
          className="list-group list-group-flush d-flex text-end py-3"
          style={{ width: "250px" }}
        >
          <p className="m-0 pb-2  fLT-Bold-sm-sB cLT-support2-text">
            {data?.name}
          </p>
          <p
            className="m-0 fLT-Regular-sB cLT-smoke-text text-ellipsis3"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></p>
        </div>
        {/* Card Amenties */}
        <div className="card-body d-flex align-items-end p-0">
          <div className="d-flex justify-content-center aling-items-center ps-4">
            <i
              className={` iLT-Advs-ksa-currency uLT-img-contain iLT-sA ms-2`}
            ></i>
            <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap ">
              {" "}
              <span> {data?.price} </span> {data?.currency?.name}{" "}
            </p>
          </div>
          <div className="d-flex justify-content-center aling-items-center">
            <i className={`iLT-Advs-calendar uLT-img-contain iLT-sA ms-2`}></i>
            <p className="mb-0 cLT-secondary-text fLT-Bold-sm-sA text-nowrap">
              قبل {data.created_at_value}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlancerAdvertise;
