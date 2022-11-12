import "./HeaderHolder.layout.scss";
import Navbar from "../../components/headerComponents/Navbar/NavBar.component";
import SearchBar from "../../components/headerComponents/SearchBar/SearchBar.component";
import ButtonShare from "../../shared/Button/Button.shared";
import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const HeaderHolder = () => {
  const location = useLocation();
  const mediaMD = useMediaQuery({ query: `(max-width: 992px)` });
  const checkLogin = useSelector((state) => state.authentication.loggedIn);

  return (
    <div className="container-md-fluid bg-white padd mxFull">
      {/* Navbar Selector */}
      <div className=" px-0 ">
        <Navbar />
      </div>
      {location.pathname !== "/register" && (
        <>
          {/* divier border */}
          <div className="LT-nav-divied uLT-bd-b-platinum-sA mb-2"></div>
          {/* SearchBar Selector */}
          <div className=" LT-searchBar-holder-grid ">
            <div className="LT-searchBar w-100">
              <SearchBar />
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* Search Bar Text  */}
              {!mediaMD && (
                <div className="LT-searchBar-text text-center cLT-main-text fLT-Regular-sB x2">
                  أو{" "}
                </div>
              )}
              {/* Button  */}
              <div className="LT-searchBar-button w-100">
                <NavLink to="/offer-price">
                  <div className="shadow uLT-f-radius-sB">
                    <ButtonShare
                      btnClasses="cLT-secondary-bg p-1 h40  uLT-f-radius-sB"
                      textClasses={`px-md-4 cLT-white-text ${
                        mediaMD ? "fLT-Regular-sA" : "fLT-Regular-sC"
                      } `}
                      innerText="اطلب عرض سعر"
                    />
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(HeaderHolder);
