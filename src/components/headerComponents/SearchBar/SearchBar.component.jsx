import "./SearchBar.component.scss";
import ArrowDown from "@mui/icons-material/ArrowDropDown";
import ArrowUp from "@mui/icons-material/ArrowDropUp";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { getSearchKey } from "../../../core/redux/reducers/Search/Search.core";
import cls from "./SearchBar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
const SearchBar = () => {
  const key = useSelector((state) => state.search.searchKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mediaMD = useMediaQuery({ query: `(max-width: 500px)` });
  const [loggin, setLoggin] = useState(false);
  const selectRef = useRef();
  const [devaultSelectValue, setDevaultSelectValue] = useState(
    selectRef.current?.value
  );

  const handleSearch = () => {
    switch (selectRef.current?.value) {
      case "الاعلانات":
        return navigate("/advertising/page=1");

      case "الطلبات":
        return navigate("/orders/page=1");

      case "المشتغلين":
        return navigate("/employed/page=1");

      default:
        navigate("/");
        break;
    }
  };

  const handleDefaultValueScreen = useCallback(() => {
    switch (location.pathname) {
      case "/advertising/page=1":
        return setDevaultSelectValue("الاعلانات");
      case "/orders/page=1":
        return setDevaultSelectValue("الطلبات");
      case "/employed/page=1":
        return setDevaultSelectValue("المشتغلين");
      default:
        return setDevaultSelectValue("الاعلانات");
    }
  }, [location.pathname]);
  useEffect(() => {
    handleDefaultValueScreen();
  }, [handleDefaultValueScreen, location.pathname]);
  const handleInput = (v) => {
    dispatch(getSearchKey(v));
  };
  const anyTwo = (e) => {
    setLoggin(false);
  };
  return (
    <div className={cls.main}>
      {/* SearchBar & Drop menu Holder  */}
      <div className="w-100">
        <form
          className="d-flex justify-content-center align-items-center hSearch"
          autoComplete="false"
        >
          {/* drop menu List  */}

          {/* Search Bar Input  */}
          <div className={cls.inputH}>
            <input
              id="searchInput"
              onFocus={(e) => anyTwo()}
              onChange={(e) => handleInput(e.target.value)}
              type="search"
              name="searchKey"
              placeholder="ابحث هنا"
              value={key}
              style={{ background: "transparent" }}
              className="w-100 fLT-Regular-sB cLT-smoke-text uLT-outline-0 uLT-border-0 uLT-f-radius-sB px-2 "
              autoComplete="false"
            />
            <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 p-md-3 uLT-l-radius-sB ">
              <div
                className="cLT-platinum-bg "
                style={{ width: "2px", height: "44px" }}
              ></div>
              {mediaMD ? (
                <div className="d-flex align-items-center">
                  <div
                    className={`${
                      !loggin ? "LT-drop-filter-true" : "LT-drop-filter-false"
                    } d-flex position-relative`}
                  >
                    {loggin ? (
                      <ArrowDown
                        sx={{ position: "absolute", right: 12, opacity: 1 }}
                      />
                    ) : (
                      <ArrowUp
                        sx={{ position: "absolute", right: 12, opacity: 1 }}
                      />
                    )}
                    <i className="iLT-drop-menu-icon iLT-sA uLT-click uLT-img-cover" />
                  </div>
                  <select
                    id="select"
                    ref={selectRef}
                    onChange={handleSearch}
                    style={{ background: "transparent" }}
                    className={`${
                      loggin ? "minimal" : "xsxs"
                    } cLT-main-text fLT-Regular-sB uLT-click`}
                  >
                    <option className="border-0" value="الاعلانات">
                      الاعلانات
                    </option>
                    <option value="المشتغلين">المشتغلين</option>
                    <option value="الطلبات">الطلبات</option>
                  </select>
                </div>
              ) : (
                <select
                  ref={selectRef}
                  id="select"
                  onChange={handleSearch}
                  value={devaultSelectValue}
                  style={{ background: "transparent" }}
                  className={` mini cLT-main-text fLT-Regular-sB uLT-click`}
                >
                  <option className="border-0" value="الاعلانات">
                    الاعلانات
                  </option>
                  <option value="المشتغلين">المشتغلين</option>
                  <option value="الطلبات">الطلبات</option>
                </select>
              )}
              {/* <button className="d-flex btn" onClick={(e) => handleSearch(e)}>
                <i className="iLT-search-bar iLT-sA uLT-click uLT-img-cover"></i>
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
