import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import FlancerAboutComponent from "../../../components/FreeLancer/fLancerProfile/FlancerAbout/FlancerAbout.component";
import FlancerAdvertise from "../../../components/FreeLancer/fLancerProfile/FlancerAdvertise/FlancerAdvertise.component";
import FlancerCertificatesComponent from "../../../components/FreeLancer/fLancerProfile/FlancerCertificates/FlancerCertificates.component";
import FlancerCommentAndReviews from "../../../components/FreeLancer/fLancerProfile/FlancerCommentAndReviews/FlancerCommentAndReviews.component";
import FlancerRate from "../../../components/FreeLancer/fLancerProfile/FlancerRate/FlancerRate.component";
import { advertisingLists } from "../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import PageTitle from "../../../shared/PageTitle/PageTitle.shared";
import "./FlancerProfilePage.page.scss";
const FlancerProfilePage = ({ data }) => {
  const param = useParams();
  const [myAdvs, setMyAdvs] = useState([]);
  const getMyAdvs = useMemo(() => {
    return advertisingLists
      ._GET_SelectUserAdvsOffer(5, true, 1, param.id)
      .then((res) => {
        setMyAdvs(res.data.data);
      })
      .catch((err) => err.response);
  }, [param.id]);
  useEffect(() => {
    if (param.id) {
      return getMyAdvs;
    }
  }, [param.id, getMyAdvs]);

  return (
    <div className="container-lg p-3 overflow-hidden cLT-white-bg ">
      {/* User About Him */}
      <div className="">
        <PageTitle title="نبذة عني" />
        <FlancerAboutComponent data={data?.description} about={"about"} />
      </div>
      {/* User Rating */}
      <div className="">
        <PageTitle title="التقيمات" />
        <FlancerRate rate={data?.rate} />
      </div>
      {/* User Reviews */}
      <div className=" ">
        <PageTitle title="الآراء والتعليقات" />
        <div className="overflow-hidden ">
          <div className="LT-user-profile-grid  overflow-auto d-flex">
            {Array(5)
              .fill()
              .map((elem, ix) => {
                return (
                  <div className="" key={ix}>
                    {" "}
                    <FlancerCommentAndReviews reviews={data?.rate?.rate} />{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* User Certificates */}
      <div className="  overflow-hidden">
        <PageTitle title="صور الاعمال والشهادات" />
        {data?.document?.length !== 0 ? (
          <div className="py-4  ">
            <FlancerCertificatesComponent certificatesData={data?.document} />
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center w-100  "
            style={{ height: "100% " }}
          >
            <div
              className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
              style={{ width: "120px", height: "65px" }}
            ></div>
            <p className="mb-0 fLT-Bold-sC cLT-gray-text">
              لا يوجد صور الاعمال والشهادات
            </p>
          </div>
        )}
      </div>
      {/* User Advertise */}
      <div className=" pb-4 ">
        <PageTitle title="اعلاناتي " />
        <div className="overflow-hidden ">
          {myAdvs?.length !== 0 ? (
            <div className="LT-user-profile-grid overflow-auto d-flex">
              {myAdvs?.map((advs, idx) => {
                return (
                  <NavLink
                    style={{
                      padding: "0 5px",
                      border: "#E9E9E9 solid 1px",
                    }}
                    className="uLT-list-style"
                    to={`/advertising/advertise-details/${advs.id}`}
                    key={idx}
                  >
                    <FlancerAdvertise data={advs} />
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center w-100  "
              style={{ height: "100% " }}
            >
              <div
                className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
                style={{ width: "120px", height: "65px" }}
              ></div>
              <p className="mb-0 fLT-Bold-sC cLT-gray-text">
                لا يوجد اعلانــــات
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(FlancerProfilePage);
