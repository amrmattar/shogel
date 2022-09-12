import AmentiesShared from "../../../shared/Amenties/Amenties.shared";
import FlancerPersonalInformationComponent from "../fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component";
import "./FlancerEmployedListCard.component.scss";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const FlancerEmployedListCard = ({ data }) => {
  const [progress, setProgress] = useState(80);
  const myPersonData = {
    avatar: data?.avatar,
    fullname: data?.fullname,
    jobName: data?.job_name_id?.name,
    myFlag: data?.nationality?.logo,
    status: data?.available,
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <div className="LT-employed-listCard-grid uLT-bd-f-platinum-sA uLT-f-radius-sB ">
        {/*  FreeLancer [Icon - Circel] */}
        <div
          className="LT-employed-icon "
          style={{ width: "42px", height: "42px" }}
        >
          <FlancerPersonalInformationComponent
            rate={data.rate}
            myData={myPersonData}
            statusIcon={
              data?.available === 1 ? (
                <div className="uLT-status-online"></div>
              ) : (
                <div className="uLT-status-offline"></div>
              )
            }
          />
        </div>
        <div className="d-flex justify-content-end align-items-start p-0">
          {/* List Card Rate */}
          <div className="info-child">
            <div className="d-flex justify-content-between w-100 align-items-start">
              {/* User Info [Holder] */}
              <div className="LT-performance-rate-holder  ">
                {/* User Rate */}

                <Box
                  sx={{
                    width: "10%",
                    position: "absolute",
                  }}
                >
                  <LinearProgressWithLabel  value={progress} />
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="LT-employed-description">
          {/* Card title */}
          <p className="m-0 fLT-Regular-sB cLT-smoke-text">
            {data?.description && data?.description}
          </p>
        </div>
        {/* Card Divied */}
        {/* Card Amenties */}
        <div className="LT-employed-amenties">
          <div className="card-body amentiesWithLocation p-0 w-100">
            {/* Amenties Holder */}
            <div className="LT-amenties-grid">
              {data?.category?.map((category) => {
                return (
                  <AmentiesShared
                    key={category?.id}
                    amentiesWithLocation={"amentiesWithLocation"}
                    amentiesWithLocationData={category?.name}
                  />
                );
              })}
            </div>
            <div className="LT-location-grid">
              <i className={`iLT-Listcard-location uLT-img-contain iLT-sA`}></i>
              <p className="mb-0 cLT-support2-text fLT-Bold-sm-sA">
                {data?.country?.name}, {data?.city?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlancerEmployedListCard;
