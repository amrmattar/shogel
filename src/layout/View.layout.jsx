import "./View.layout.scss";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import Footer from "./Footer/Footer.layout";
import HeaderHolder from "./Headers/HeaderHolder.layout";
import MasterContainer from "./Master-Container/MasterContainer.layout";
import SideNav from "./SideNav/SideNav.layout";
import PageHeader from "../shared/PageHeader/PageHeader.shared";
import { useSelector } from "react-redux";
import { useState } from "react";

const ViewLayout = ({ isNotification, setIsNotification }) => {
  const location = useLocation();
  const show = useSelector((state) => state.Fotter.visible);
  const { id } = useParams();

  return (
    <div className="d-flex flex-column align-items-between p-0 h-100">
      {location.pathname !== "/offer-price" &&
      !location.pathname.includes(`/update-offer-price/`) &&
      !location.pathname.includes(`/advertising-price/`) &&
      location.pathname !== "/freelancer-offer" &&
      !location.pathname.includes("register") &&
      !location.pathname.includes("dev") &&
      location.pathname !== "/advertising-price" ? (
        <header className="w-100 bg-white borderHeader">
          {/* Nav Gradian-Linear [Line] */}
          <div className="cLT-Gradian-Linear-Main LT-nav-line "></div>
          {/* Navbar  & Searchbar  [Holder] */}
          <HeaderHolder
            isNotification={isNotification}
            setIsNotification={setIsNotification}
          />
        </header>
      ) : (
        <></>
      )}
      {/* Main Content  [Holder] */}
      {location.pathname.includes("/account_management") && (
        <div className="container-fluid px-0">
          <PageHeader />
        </div>
      )}

      <main
        style={{ minHeight: "80vh" }}
        className={`${
          location.pathname.includes("/account_management")
            ? "d-flex gap-3 flex-column flex-lg-row px-3 container-lg px-lg-0"
            : ""
        }`}
      >
        {location.pathname?.includes("advertising/page=") ||
        location.pathname?.includes("orders") ||
        location.pathname?.includes("employed") ? (
          <div className="container-fluid container-md mxFull px-md-0 px-3">
            <SideNav />
            <MasterContainer setIsNotification={setIsNotification} />
          </div>
        ) : (
          <>
            <SideNav />
            <MasterContainer setIsNotification={setIsNotification} />
          </>
        )}
      </main>
      {/* Footer  [Holder] */}
      {show &&
        !location.pathname.includes("register") &&
        !location.pathname.includes("chat") &&
        !location.pathname.includes("dev") && (
          <footer className="imLT-footer-shape uLT-img-cover cLT-main-bg">
            {/* Footer Gradian-Linear [Line] */}
            <div className="cLT-Gradian-Linear-Main LT-footer-line "></div>
            {/* Footer Feature [Holder] */}
            <div className="container-fluid px-0">
              {" "}
              <Footer />
            </div>
          </footer>
        )}
    </div>
  );
};

export default ViewLayout;
