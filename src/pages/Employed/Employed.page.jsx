import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import FlancerEmployedListCard from "../../components/FreeLancer/FlancerEmployedComponent/FlancerEmployedListCard.component";
import { freelancersListProfile } from "../../core/services/userProfile/FreelancersListProfile/FreelancersListProfile.core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import cls from "./Employee.module.scss";
import DynamicFilter from "../Orders/OrderPage/DynamicFilter";
import { API } from "../../enviroment/enviroment/enviroment";

const mostUse = [
  { id: 1, name: "افراد" },
  { id: 2, name: "شركات" },
  { id: 3, name: "بالقرب مني" },
  { id: 4, name: "الاكثر رد علي الطلبات" },
];
const Employed = () => {
  const param = useParams();
  const navigate = useNavigate();
  const key = useSelector((state) => state.search.searchKey);

  // Todo Block Of Get All Advertising Form
  const [currentPage, setCurrentPage] = useState(null);
  const [flancersList, setFlancersList] = useState();

  const [pagination, setPagination] = useState();
  const handleAdvsPagination = useMemo(() => {
    setPagination(flancersList?.pagination?.total_pages);
  }, [flancersList?.pagination]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!flancersList?.pagination) {
        return handleAdvsPagination;
      }
    }, 1000);
    return clearTimeout(timeout);
  }, [flancersList?.pagination, handleAdvsPagination]);

  const getPageNumber = (e, value) => {
    setCurrentPage(param?.num || 1);
    navigate(`/employed/page=${value}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  ///////////////////
  const categHandler = (id, state) => {
    setCateg((prev) => {
      const newData = prev.find((ele) => ele == id)
        ? prev.filter((ele) => ele !== id)
        : [...prev, id];

      return newData;
    });
  };
  const [active, setActive] = useState(null);
  const [rate, setRate] = useState(0);
  const [categ, setCateg] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await API.get("coredata/category/list");
      setCategories(res.data?.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const resetCateg = () => {
    setCateg([]);
  };
  ////////////////////////////////////////
  const timeRef = useRef(0);

  useEffect(() => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const body = new FormData();
      body.set("perPage", 10);
      body.set("page", param?.num || 1);
      body.set("pagination", true);
      body.set("search", true);
      body.set("fullname", key);

      body.set("category", categ);
      body.set("rate", rate == 0 ? null : rate);
      body.set("available", active);
      body.set("location", location);
      freelancersListProfile
        ._POST_FreelancersListProfileV2(body)
        .then((res) => {
          key?.searchKey && setFlancersList(res.data);
          setFlancersList(res.data);
        })
        .catch((err) => {
          return err.response;
        });
    }, 1000);
    return () => clearTimeout(timeRef.current);
  }, [rate, active, location, categ, key]);

  useEffect(() => {
    const fetchAds = async () => {
      const body = new FormData();
      body.set("perPage", 10);
      body.set("pagination", true);
      body.set("page", param?.num || 1);
      body.set("search", true);
      body.set("fullname", key);

      body.set("category", categ);
      body.set("rate", rate == 0 ? null : rate);
      body.set("available", active);
      body.set("location", location);
      freelancersListProfile
        ._POST_FreelancersListProfileV2(body)
        .then((res) => {
          key?.searchKey && setFlancersList(res.data);
          setFlancersList(res.data);
        })
        .catch((err) => {
          return err.response;
        });
    };

    fetchAds();
  }, [currentPage, rate, active, location, categ, key]);

  // Condition For Show Loading Style Untill Data Return From API
  if (!flancersList?.data)
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
      <div className={cls.container}>
        <div className="d-flex"></div>
        <div className={cls.holder}>
          <DynamicFilter
            isEmployee={true}
            setCategory={categHandler}
            setActive={setActive}
            setRate={setRate}
            resetCateg={resetCateg}
            rate={rate}
            setLocation={setLocation}
            mostUse={mostUse}
            categories={categories}
            activesId={categ}
          />
          {flancersList?.data.length !== 0 ? (
            <div className="cLT-white-bg p-3 ">
              {flancersList?.data?.map((list, idx) => {
                return (
                  <NavLink
                    className="uLT-list-style"
                    to={`/employed/freelancer-profile/${list?.id}`}
                    key={idx}
                  >
                    <FlancerEmployedListCard data={list} />
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center w-100"
              style={{ height: "100vh " }}
            >
              <div
                className="imLT-main-logo uLT-img-contain uLT-f-radius-sB img-fluid uLT-f-radius-sB"
                style={{ width: "200px", height: "200px" }}
              ></div>
              <p className="mb-0 fLT-Bold-sD cLT-gray-text">لا يوجد مشتغلين</p>
            </div>
          )}
        </div>
        {/* Pagination [Holder] */}
        <div className="container d-flex justify-content-center pb-3 pt-4 mt-auto">
          {/* Pagination [Number Navigate Holder] */}
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
      </div>
    </>
  );
};

export default Employed;
