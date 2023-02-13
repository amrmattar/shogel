import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { userProfile } from "../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import AsideFreelancerPage from "../AsideFreelancerPage/AsideFreelancerPage.pages";
import FlancerProfilePage from "../FlancerPages/FlancerProfilePage/FlancerProfilePage.page";
import SideNavFlancerProfilePages from "../sideNavPage/SideNavFlancerProfile/SideNavFlancerProfile.pages";
import "./FLancerProfileAndSideNav.page.scss";

const FLancerProfileAndSideNavPage = () => {
  const navigate = useNavigate();
  const param = useParams();

  // Get User Profile By Param ID
  const [isResult, setResult] = useState({});

  useEffect(() => {
    if (Object.keys(isResult).length) return;

    userProfile
      ._GET_ProfileData(param.id)
      .then(({ data }) => {
        setResult(data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/");
      });

    // fetchResult();

    // cleanup effect
    return () => {};
  }, [isResult, param?.id, navigate]);
  // Navigate If Data Not Found

  if (!Object.keys(isResult).length)
    return (
      <div
        style={{ transform: "scale(3)" }}
        className="d-flex justify-content-center align-items-center w-100 vh-100"
      >
        <div className="fs-5 spinner"></div>
      </div>
    );

  return (
    <>
      <Outlet />
      <div className="d-flex flex-column px-0 gap-3 container-fluid ">
        {/* Main Back Ground  */}
        <div
          className="container-fluid py-5 px-4 cLT-main-bg"
          style={{ height: "217px" }}
        />
        <div className="d-flex flex-column flex-lg-row px-0 px-sm-3 gap-3 px-lg-0 container-lg">
          <div className="LT-sidenav-media-screen">
            {/* <SideNav User Personal Data /> */}{" "}
            {/* <SideNav User Skills Data /> */}
            <AsideFreelancerPage
              fullnameShowen
              userDataByParam={isResult}
              setMarginTop={-70}
              setMarginBottom={10}
              selector={<SideNavFlancerProfilePages data={isResult} />}
            />
          </div>

          {/* <User Profile Page By Param ID /> */}
          <FlancerProfilePage data={isResult} />
        </div>
      </div>
    </>
  );
};

export default FLancerProfileAndSideNavPage;
