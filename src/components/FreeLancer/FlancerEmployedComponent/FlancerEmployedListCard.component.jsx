import { Box, CircularProgress, Typography } from "@mui/material";
import AmentiesShared from "../../../shared/Amenties/Amenties.shared";
import { arNumberConverter } from "../../../utils/arNumberConverter";
import FlancerPersonalInformationComponent from "../fLancerProfile/FlancerPersonalInformation/FlancerPersonalInformation.component";
import CompletionChart from "./CompletionChart";
import "./FlancerEmployedListCard.component.scss";

const CircularProgressWithLabel = ({ parentClassName, ...props }) => {
  return (
    <Box
      className={parentClassName}
      sx={{ position: "relative", display: "inline-flex" }}
    >
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const FlancerEmployedListCard = ({ data, small }) => {
  const myPersonData = {
    avatar: data?.avatar,
    fullname: data?.fullname,
    jobName: data?.role?.name,
    myFlag: data?.nationality?.logo,
    status: data?.available,
    profileComplition: data?.complete_profile,
    info: data?.info,
    description: data?.description,
  };

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
            nowraps
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

              <CompletionChart
                className="d-none d-md-flex"
                value={myPersonData.profileComplition}
              />

              <CircularProgressWithLabel
                parentClassName="d-md-none"
                value={arNumberConverter(myPersonData.profileComplition || 0)}
              />
            </div>
          </div>
        </div>
        <div className="LT-employed-description">
          {/* Card title */}
          <p className="m-0 fLT-Regular-sB text-dark">
            {data?.info?.length > 40
              ? data?.info.slice(0, 40) + "..."
              : data?.info}
          </p>
        </div>
        {/* Card Divied */}
        {/* Card Amenties */}
        <div className="LT-employed-amenties">
          <div className="row card-body amentiesWithLocation p-0 w-100">
            {/* Amenties Holder */}
            <div className="col-9 LT-amenties-grid">
              {data?.category?.slice(0, 4)?.map((category) => {
                return (
                  <>
                    <AmentiesShared
                      key={category?.id}
                      amentiesWithLocation={"amentiesWithLocation"}
                      amentiesWithLocationData={category?.name}
                      maxWidth
                    />
                  </>
                );
              })}
            </div>

            <div className="col-3 LT-location-grid">
              <i className={`iLT-Listcard-location uLT-img-contain iLT-sA`}></i>
              <p
                className={`mb-0 cLT-support2-text fLT-Bold-sm-sA ${
                  small ? "main-color-in-sm" : ""
                }`}
              >
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
