import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import cls from "./FlancerAdvsListPage.page.module.scss";
import FlancerAdvsListCardComponent from "../../../../components/FreeLancer/FlancerAdvertisingComponent/FlancerAdvsListCard/FlancerAdvsListCard.component";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Helmet from "react-helmet";
import { pageTitle } from "../../../../core/services/PageTitleServices/PageTitleServices.core";
import { useSelector } from "react-redux";
import DynamicFilter from "../../../Orders/OrderPage/DynamicFilter";
import { API } from "../../../../enviroment/enviroment/enviroment";
import { IconButton } from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import FlancerAdvsGridCards from "../../../../components/FreeLancer/FlancerAdvertisingComponent/FlancerAdvsGridCard/FlancerAdvsGridCard.component";

const categories = [
  {
    id: 1,
    title: "برمجة",
    subs: [
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
    ],
  },
  { id: 2, title: "جوال" },
  { id: 3, title: "جرافيك" },
  { id: 4, title: "عروض" },
  { id: 5, title: "فيديو" },
  { id: 6, title: "مايكرو" },
  { id: 7, title: "رسم" },
  {
    id: 8,
    title: "ترجمة",
    subs: [
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
      { id: 1, title: "برمجة ويب" },
    ],
  },
  { id: 9, title: "شغل" },
  { id: 10, title: "قيادة" },
  { id: 11, title: "تسويق" },
  { id: 12, title: "محاسبة" },
  { id: 13, title: "علوم" },
  { id: 14, title: "شبكات" },
];

const mostUse = [
  { id: 1, name: "افراد", key: "freelancer" },
  { id: 2, name: "شركات", key: "compnay" },
  { id: 3, name: "بالقرب مني", key: "near" },
];

const treeToList = (arr) => {
  if (!arr.length) return [];

  const array = [...arr];
  let result = [];

  const render = (arr) => {
    result.push({
      active: arr.active,
      id: arr.id,
      name: arr.name,
      type_work: arr.type_work,
      parentId: arr.parent_id || arr.parentId || 0,
      children: arr.children || arr.child,
    });

    arr?.children?.map((skl) => render(skl));
  };

  render({ children: array });
  delete result[0];

  return result.filter((res) => res);
};

const FlancerAdvsListPage = () => {
  const [loading, setLoading] = useState(true);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [attendeesStatus, setAttendeesStatus] = useState("all");

  const param = useParams();
  const navigate = useNavigate();
  const key = useSelector((state) => state.search.searchKey);
  const [vistorUser, getSearchKey] = useSelector((state) => [
    state.authentication.loggedIn,
    state.search,
  ]);

  // Todo Block Of Get All Advertising Form

  const [currentPage, setCurrentPage] = useState(null);
  const [userAdvsDetatils, setUserAdvsDetatils] = useState();
  //  Use MEMO Function To Store Whte API Return Advertising List Data

  // Fire UseMemo Function One Time And Listen To State Value If Change So Fire Again And Get New Response

  // ? ------------------[[[START Block]]]-----------------
  //*TODO GET From API Response ==> Advertising Pagination

  const [pagination, setPagination] = useState();
  const handleAdvsPagination = useMemo(() => {
    setPagination(userAdvsDetatils?.pagination?.total_pages);
  }, [userAdvsDetatils?.pagination]);
  ///////////////////////////
  const [categories, setCategories] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  // search
  const [query, setQuery] = useState("");
  const [mostUsedKeys, setMostUsedKeys] = useState({
    freelancer: false,
    compnay: false,
    near: false,
  });

  // search Query
  useEffect(() => {
    setSearchResult(() => {
      return categories.filter((categ) => categ.name.includes(query));
    });
  }, [query, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("coredata/category/list");
        setCategories(res?.data?.data || []);
      } catch (e) {}
    };

    fetchCategories();
  }, []);

  const [active, setActive] = useState(null);
  const [rate, setRate] = useState(null);
  const [price, setPrice] = useState([]);
  const [categ, setCateg] = useState([]);
  const [rateCount, setRateCount] = useState([]);
  const [location, setLocation] = useState("");
  const [mostUseId, setMostUseId] = useState([]);

  const timeRef = useRef(0);

  const resetCateg = () => {
    setCateg([]);
  };
  const resetMost = () => {
    setMostUseId([]);
  };
  const categHandler = (arrayOfIds) => {
    setCateg((prev) => {
      let newData = [...prev];
      arrayOfIds.forEach((id) => {
        const idx = newData.indexOf(id);
        if (idx > -1) {
          newData.splice(idx, 1);
        } else {
          newData.push(id);
        }
      });
      return newData;
    });
  };
  const listOfUsersAdvs = useMemo(() => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const body = new FormData();
      body.set("perPage", 10);
      body.set("page", currentPage || 1);
      body.set("pagination", true);
      body.set("search", true);
      body.set("name", key);

      body.set("category", categ);
      body.set("price", price);
      body.set("rate_count", rateCount);
      body.set("rate", rate);
      body.set("available", active);
      body.set("location", location);

      body.set("freelancer", mostUsedKeys?.freelancer);
      body.set("compnay", mostUsedKeys?.compnay);
      body.set("near", mostUsedKeys?.near);

      return advertisingLists
        ._POST_AllAdvsOfferV2(body)
        .then((res) => {
          setUserAdvsDetatils(res.data);

          if (location) {
            setIsFirstRender(false);
            setLoading(false);
          }
        })
        .catch((err) => {
          return err.response;
        });
    }, 1000);

    return () => clearTimeout(timeRef.current);
  }, [
    price,
    location,
    categ,
    key,
    rate,
    rateCount,
    active,
    currentPage,
    mostUsedKeys,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userAdvsDetatils?.pagination) {
        return handleAdvsPagination;
      }
    }, 1000);
    return clearTimeout(timeout);
  }, [userAdvsDetatils?.pagination, handleAdvsPagination]);
  // TODO GET From API Response ==> Advertising Pagination
  // ? ------------------[[[END Block]]]-----------------

  // Todo Set Current Page
  const getPageNumber = (e, value) => {
    setCurrentPage(value);
    navigate(`/advertising/page=${value}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userAdvsDetatils?.data) {
        return listOfUsersAdvs;
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [userAdvsDetatils?.data, listOfUsersAdvs]);

  // useEffect(() => {
  //   if (!location) return;
  //   console.log(location);

  //   const fetchAds = async () => {
  //     const body = new FormData();
  //     body.set("perPage", 10);
  //     body.set("page", currentPage || 1);
  //     body.set("pagination", true);
  //     body.set("search", true);
  //     body.set("name", key);

  //     body.set("category", categ);
  //     body.set("price", price);
  //     body.set("rate_count", rateCount);
  //     body.set("rate", rate);
  //     body.set("available", active);
  //     body.set("location", location);
  //     body.set("attendeesStatus", attendeesStatus);

  //     body.set("freelancer", mostUsedKeys?.freelancer);
  //     body.set("compnay", mostUsedKeys?.compnay);
  //     body.set("near", mostUsedKeys?.near);

  //     return advertisingLists
  //       ._POST_AllAdvsOfferV2(body)
  //       .then((res) => {
  //         setUserAdvsDetatils(res.data);

  //         if (location) {
  //           setIsFirstRender(false);
  //         }
  //       })
  //       .catch((err) => {
  //         return err.response;
  //       });
  //   };

  //   fetchAds();
  // }, [
  //   currentPage,
  //   price,
  //   location,
  //   categ,
  //   key,
  //   rate,
  //   rateCount,
  //   active,
  //   attendeesStatus,
  //   mostUsedKeys,
  // ]);

  useEffect(() => {
    let mostUsed = mostUse.map((most) => {
      return {
        key: most.key,
        value: mostUseId.find((id) => id === most?.id) ? true : false,
      };
    });
    mostUsed = mostUsed.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {}
    );

    setMostUsedKeys(mostUsed);
  }, [mostUseId]);

  // Condition For Show Loading Style Untill Data Return From API
  if (!userAdvsDetatils?.data)
    return (
      <div
        style={{ height: "60vh" }}
        className="position-relative d-flex justify-content-center align-items-center w-100 py-4"
      >
        <div className="LT-logo-border-forwards-loading"></div>
        <div
          className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB"
          style={{ width: "120px", height: "120px" }}
        ></div>
        <div className="LT-logo-border-backwards-loading"></div>
      </div>
    );

  return (
    <>
      <div className={cls.container + ` ${loading ? "d-none" : ""}`}>
        <div className="d-flex"></div>
        <header className="d-flex justify-content-between align-items-center d-md-none container mb-3">
          <p className="m-0">جميع الاعلانات</p>

          <IconButton onClick={() => setIsFilterOpen(true)} className="p-0">
            <article className="main-bg-color border px-2 py-1 rounded-2">
              <TuneIcon className="text-light" />
            </article>
          </IconButton>
        </header>

        <div className={cls.holder + " d-block d-md-grid"}>
          <DynamicFilter
            setAttendeesStatus={setAttendeesStatus}
            attendeesStatus={attendeesStatus}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            query={query}
            mostUse={mostUse}
            rate={rate}
            categories={query ? searchResult : categories}
            activesId={categ}
            mostUseId={mostUseId}
            isAdvert={true}
            resetCateg={resetCateg}
            setQuery={setQuery}
            setCategory={categHandler}
            setPrice={setPrice}
            setActive={setActive}
            setRate={setRate}
            setLocation={setLocation}
            location={location}
            setRateCount={setRateCount}
            resetMost={resetMost}
            setMostUseId={setMostUseId}
          />
          {userAdvsDetatils?.data?.length && !isFirstRender ? (
            <div className="cLT-white-bg p-3 ">
              {userAdvsDetatils?.data?.map((advs, ix) => {
                return (
                  <>
                    <NavLink
                      className="uLT-list-style d-block d-md-none"
                      to={`/advertising/advertise-details/${advs.id}`}
                      key={ix}
                    >
                      {" "}
                      <FlancerAdvsGridCards data={advs} roll={true} />{" "}
                    </NavLink>

                    <NavLink
                      className="uLT-list-style d-none d-md-block"
                      to={`/advertising/advertise-details/${advs.id}`}
                      key={ix}
                    >
                      {" "}
                      <FlancerAdvsListCardComponent
                        data={advs}
                        roll={true}
                      />{" "}
                    </NavLink>
                  </>
                );
              })}
            </div>
          ) : loading ? (
            <div className="position-relative d-flex justify-content-center align-items-center w-100 h-100 py-4">
              <div className="LT-logo-border-forwards-loading"></div>
              <div
                className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB"
                style={{ width: "120px", height: "120px" }}
              ></div>
              <div className="LT-logo-border-backwards-loading"></div>
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center w-100  "
              style={{ height: "100vh " }}
            >
              <div
                className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
                style={{ width: "200px", height: "200px" }}
              ></div>
              <p className="mb-0 fLT-Bold-sD cLT-gray-text">
                لا يوجد إعلانـــات
              </p>
            </div>
          )}
        </div>
        {/* Pagination [Holder] */}
        <div className="container d-flex justify-content-center pt-4 mt-auto">
          <Stack my={3}>
            <Pagination
              dir="rtl"
              showFirstButton={true}
              showLastButton={true}
              count={pagination}
              page={parseInt(param?.num)}
              onChange={getPageNumber}
              size="large"
            />
          </Stack>
        </div>
      </div>

      <div
        style={{ height: "60vh" }}
        className={`${
          !loading ? "d-none" : ""
        } position-relative d-flex justify-content-center align-items-center w-100 py-4`}
      >
        <div className="LT-logo-border-forwards-loading"></div>
        <div
          className="iLT-shogol-logo App-logo-animation uLT-img-contain uLT-f-radius-sB img-fluid~ uLT-f-radius-sB"
          style={{ width: "120px", height: "120px" }}
        ></div>
        <div className="LT-logo-border-backwards-loading"></div>
      </div>
    </>
  );
};

export default React.memo(FlancerAdvsListPage);
