import AmentiesShared from "../../../../shared/Amenties/Amenties.shared";
import FlancerDescriptionBodyComponent from "../../fLancerProfile/FlancerDescriptionBody/FlancerDescriptionBody.component";
import FlancerDescriptionTitleComponent from "../../fLancerProfile/FlancerDescriptionTitle/FlancerDescriptionTitle.component";
import FlancerPersonalInformationComponent from "../../fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component";
import "./FlancerAdvsListCard.component.scss";

const FlancerAdvsListCardComponent = ({ data, roll }) => {
  return (
    <>
      {/* Advs List Card [Holder] */}
      <div className="LT-advsListCard-grid mb-3">
        {/* Advs Image [Section] */}
        {!data?.document[0]?.file.match(".mp4") ? (
          data?.document[0]?.file ? (
            <picture className="LT-advsListCard-img">
              <img
                src={data?.document[0]?.file}
                alt=""
                width={"100%"}
                style={{ height: "177px" }}
              />
            </picture>
          ) : (
            <picture
              className="LT-advsListCard-img"
              style={{ width: "216px", height: "177px" }}
            >
              <div className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB w-100 h-100"></div>
            </picture>
          )
        ) : (
          <video width="216" height="500" controls autoPlay={true}>
            <source src={data?.document[0]?.file} type="video/mp4" />
          </video>
        )}
        {/* Details [Section] */}
        <div className="LT-advsListCard-details">
          <div className="info-child">
            <div className="d-flex justify-content-between w-100 align-items-start">
              {/* User Info [Holder] */}
              <FlancerPersonalInformationComponent
                myData={data?.user}
                statusIcon={
                  data?.user?.available === 1 ? (
                    <div className="uLT-status-online"></div>
                  ) : (
                    <div className="uLT-status-offline"></div>
                  )
                }
              />
              <div className="LT-performance-rate-holder d-flex justify-content-end align-items-start  ">
                {/* User Rate */}
                <div className="d-flex align-items-center LT-rate-font-size  ">
                  <p className="m-0 card-text cLT-support2-text ">
                    ({data?.user?.rate.count})
                  </p>
                  <p className="m-0 card-text cLT-support2-text ">
                    {data?.user?.rate.rate}
                  </p>
                  <i
                    className={` iLT-Rate-star uLT-img-contain LT-rate-icon-size me-sm-2`}
                  ></i>
                </div>
                {/* <div className="" dir="ltr">
                                    <RateViewShared RateCount={4.5} RateNumber={"(22)"} />
                                </div> */}
              </div>
            </div>
          </div>
          {/* Card title */}
          <div className="LT-advsListCard-description">
            <FlancerDescriptionTitleComponent
              fontSize={"titleSize"}
              descriptionTitle={data?.name}
            />
            {roll && (
              <FlancerDescriptionBodyComponent
                fontSize={"decriptionSize"}
                descriptionBody={data?.description}
              />
            )}
          </div>
          {/* Card Amenties */}
          <div className="LT-advsListCard-amenties">
            {roll && (
              <AmentiesShared
                iconWithLocation={"priceIconWithLocation"}
                time={data?.created_at_value}
                currency={data?.currency?.name}
                price={data?.price}
                locationName={`${data?.user?.country?.name}, ${data?.user?.city?.name}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FlancerAdvsListCardComponent;
