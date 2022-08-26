import "./View.layout.scss";
import { useLocation } from "react-router";
import Footer from "./Footer/Footer.layout";
import HeaderHolder from "./Headers/HeaderHolder.layout";
import MasterContainer from "./Master-Container/MasterContainer.layout";
import SideNav from "./SideNav/SideNav.layout";
import PageHeader from "../shared/PageHeader/PageHeader.shared";
import { useSelector } from "react-redux";

const ViewLayout = () => {
  const location = useLocation();
  const show = useSelector((state) => state.Fotter.visible);
  return (
    <div className="d-flex flex-column align-items-between gap-3 p-0 justify-content-between h-100">
      {location.pathname !== "/offer-price" &&
      location.pathname !== "/freelancer-offer" &&
      !location.pathname.includes("register") &&
      !location.pathname.includes("dev") &&
      location.pathname !== "/advertising-price" ? (
        <header className="w-100 bg-white">
          {/* Nav Gradian-Linear [Line] */}
          <div className="cLT-Gradian-Linear-Main LT-nav-line "></div>
          {/* Navbar  & Searchbar  [Holder] */}
          <HeaderHolder />
        </header>
      ) : (
        false
      )}
      {/* Main Content  [Holder] */}
      {location.pathname.includes("/account_management") && (
        <div className="container-fluid px-0">
          <PageHeader />
        </div>
      )}
      <main
        className={
          location.pathname.includes("/account_management")
            ? "d-flex gap-3 flex-column flex-lg-row px-3 container-lg px-lg-0"
            : ""
        }
      >
        <SideNav />
        <MasterContainer />
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
