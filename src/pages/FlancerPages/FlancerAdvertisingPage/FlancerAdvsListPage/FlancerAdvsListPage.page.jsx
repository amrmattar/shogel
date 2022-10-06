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
  { id: 1, name: "افراد" },
  { id: 2, name: "شركات" },
  { id: 3, name: "بالقرب مني" },
  { id: 4, name: "الاكثر رد علي الطلبات" },
];

const FlancerAdvsListPage = () => {
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

  // search
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get(
          `coredata/category/list${query ? `?name=${query}` : ""}`
        );

        const treeToFlatArray = (tree) => {
          let result = [];

          const nodeTree = {
            id: "root",
            children: tree,
          };
          const faltHandelar = (node) => {
            const returned = (node.children.length ? [] : [[node]]).concat(
              ...node.children.map((child) =>
                faltHandelar(child).map((arr) => [node, ...arr])
              )
            );

            return returned;
          };

          faltHandelar(nodeTree)?.forEach((list) => result.push(...list));
          result = result.filter((res) => res && res.id !== "root");

          return result;
        };

        setCategories(treeToFlatArray(data?.data));
      } catch (err) {
        console.log(err?.message);
      }
    };

    fetchCategories();
  }, [query]);

  const [active, setActive] = useState(null);
  const [rate, setRate] = useState(null);
  const [price, setPrice] = useState([]);
  const [categ, setCateg] = useState([]);
  const [rateCount, setRateCount] = useState([]);
  const [location, setLocation] = useState("");
  const categHandler = (id, state) => {
    state
      ? setCateg([...categ, id])
      : setCateg(categ.filter((ele) => ele != id));
  };
  const timeRef = useRef(0);

  const listOfUsersAdvs = useMemo(() => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const body = new FormData();
      body.set("perPage", 20);
      body.set("pagination", true);
      body.set("search", true);
      body.set("name", key);

      body.set("category", categ);
      body.set("price", price);
      body.set("rate_count", rateCount);
      body.set("rate", rate);
      body.set("available", active);
      body.set("location", location);
      return advertisingLists
        ._POST_AllAdvsOfferV2(body)
        .then((res) => {
          setUserAdvsDetatils(res.data);
        })
        .catch((err) => {
          return err.response;
        });
    }, 1000);
    return () => clearTimeout(timeRef.current);
  }, [price, location, categ, key, rate, rateCount, active]);

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
    setCurrentPage(param.num);
    navigate(`/advertising/page=${value}`);
    window.scrollTo({
      top: 250,
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

  // Condition For Show Loading Style Untill Data Return From API
  if (!userAdvsDetatils?.data)
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100 "
        style={{ height: "100vh" }}
      >
        <div
          className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
          style={{ width: "200px", height: "200px" }}
        ></div>
      </div>
    );

  return (
    <>
      {/* Advertising List [Holder] */}

      <div className={cls.container}>
        <div className="d-flex"></div>
        <div className={cls.holder}>
          <DynamicFilter
            isAdvert={true}
            query={query}
            setQuery={setQuery}
            setCategory={categHandler}
            setPrice={setPrice}
            setActive={setActive}
            setRate={setRate}
            setLocation={setLocation}
            setRateCount={setRateCount}
            mostUse={mostUse}
            categories={categories}
          />
          {userAdvsDetatils?.data?.length !== 0 ? (
            <div className="cLT-white-bg p-3 ">
              {userAdvsDetatils?.data?.map((advs, ix) => {
                return (
                  <NavLink
                    className="uLT-list-style"
                    to={
                      vistorUser && `/advertising/advertise-details/${advs.id}`
                    }
                    key={ix}
                  >
                    {" "}
                    <FlancerAdvsListCardComponent
                      data={advs}
                      roll={vistorUser}
                    />{" "}
                  </NavLink>
                );
              })}
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
        {userAdvsDetatils?.data?.length === 9 && (
          <div className="container d-flex justify-content-center pt-4 mt-auto">
            <Stack>
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
        )}
      </div>
    </>
  );
};

export default React.memo(FlancerAdvsListPage);
