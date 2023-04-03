import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AmentiesShared from "../../../shared/Amenties/Amenties.shared";
import ButtonShare from "../../../shared/Button/Button.shared";
import CircularStatic from "../../../shared/ProgressBar/ProgressBar.shared";
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

const FlancerEmployedListCard = ({ data, small, to }) => {
  const navigate = useNavigate();
  const loggedIn = useSelector(
    ({ authentication }) => authentication?.loggedIn
  );

  const myPersonData = {
    id: data.id,
    avatar: data?.avatar,
    fullname: data?.fullname,
    jobName: data?.role?.name,
    myFlag: data?.nationality?.logo,
    status: data?.available,
    profileComplition: data?.complete_profile,
    info: data?.info,
    description: data?.description,
    to: to,
  };

  const handelShglnyBtn = (route) => {
    if (loggedIn) {
      navigate(route);
    } else {
      navigate(`/login`, { state: { routeTo: route } });
    }
  };

  return (
    <>
      <div className="LT-employed-listCard-grid uLT-bd-f-platinum-sA uLT-f-radius-sB ">
        {/*  FreeLancer [Icon - Circel] */}
        <div
          className="LT-employed-icon"
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
        <div
          style={{ width: "fit-content", marginRight: "auto" }}
          className="d-flex justify-content-end align-items-center p-0"
        >
          {/* List Card Rate */}
          <div className="d-none d-md-block">
            <CircularStatic
              num={arNumberConverter(myPersonData.profileComplition || 0)}
            />
          </div>

          {(myPersonData?.jobName === "freelancer" ||
            myPersonData?.jobName === "company") && (
            <div
              style={{ zIndex: 999 }}
              className={
                "uLT-list-style me-3 text-decoration-none d-md-block d-none"
              }
            >
              <div style={{ zIndex: 999 }} className="shadow uLT-f-radius-sB">
                <ButtonShare
                  onClick={() =>
                    handelShglnyBtn(`/freelancer-offer/${myPersonData?.id}`)
                  }
                  btnClasses="cLT-secondary-bg py-2 cu-pointer px-4  d-flex align-items-center gap-2 uLT-f-radius-sB"
                  textClasses={`fLT-Regular-sB px-1 cLT-white-text `}
                  innerText="شغلني"
                  iconName={"iLT-work-case-white"}
                />
              </div>
            </div>
          )}
        </div>
        <div className="LT-employed-description">
          {/* Card title */}
          <p
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              width: "80%",
            }}
            className="m-0 fLT-Regular-sB text-dark"
          >
            {myPersonData?.info?.length > 150 ? (
              <span style={{ whiteSpace: "normal" }}>
                {myPersonData?.info.slice(0, 150) + "..."}
              </span>
            ) : (
              myPersonData?.info
            )}
          </p>
        </div>
        {/* Card Divied */}
        {/* Card Amenties */}

        <div className="LT-employed-amenties">
          <div className="row card-body amentiesWithLocation p-0 w-100">
            {/* Amenties Holder */}
            <div className="col-9 LT-amenties-grid flex-wrap">
              {data?.category?.slice(0, 3)?.map((category) => {
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
                style={{ whiteSpace: "nowrap" }}
                className={`mb-0 cLT-support2-text fLT-Bold-sm-sA ${
                  small ? "main-color-in-sm" : ""
                }`}
              >
                {data?.city?.name}
              </p>
            </div>

            {myPersonData?.jobName === "freelancer" && (
              <NavLink
                style={{ zIndex: 999 }}
                to={`/freelancer-offer/${myPersonData?.id}`}
                className={
                  "uLT-list-style me-3 text-decoration-none d-md-none text-center"
                }
              >
                <div
                  style={{ zIndex: 999 }}
                  className="shadow uLT-f-radius-sB text-center"
                >
                  <ButtonShare
                    btnClasses="cLT-secondary-bg py-2 cu-pointer px-4 d-flex align-items-center justify-content-center gap-2 uLT-f-radius-sB"
                    textClasses={`fLT-Regular-sB px-1 cLT-white-text`}
                    innerText="شغلني"
                    iconName={"iLT-work-case-white"}
                  />
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlancerEmployedListCard;
