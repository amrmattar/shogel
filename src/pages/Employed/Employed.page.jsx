import { Fragment, useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import FlancerEmployedListCard from "../../components/FreeLancer/FlancerEmployedComponent/FlancerEmployedListCard.component";
import { freelancersListProfile } from "../../core/services/userProfile/FreelancersListProfile/FreelancersListProfile.core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import cls from './Employee.module.scss'
import DynamicFilter from "../Orders/OrderPage/DynamicFilter";
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
  { id: 1, title: "افراد" },
  { id: 2, title: "شركات" },
  { id: 3, title: "بالقرب مني" },
  { id: 4, title: "الاكثر رد علي الطلبات" },
];
const Employed = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [getSearchKey] = useSelector((state) => [state.search]);

  // Todo Block Of Get All Advertising Form
  const [currentPage, setCurrentPage] = useState(null);
  const [flancersList, setFlancersList] = useState();
  //  Use MEMO Function To Store Whte API Return Advertising List Data
  // const listOfUsersAdvs = useMemo(() => {
  //     return freelancersListProfile._GET_FreelancersListProfile(10, true, param.num, getSearchKey.searchStatus, getSearchKey?.searchKey).then(res => {
  //         setFlancersList(res.data)
  //     }).catch(err => { return err.response })
  // }, [param.num, getSearchKey?.searchKey])
  // Fire UseMemo Function One Time And Listen To State Value If Change So Fire Again And Get New Response

  useEffect(() => {
    let cancel = false;
    freelancersListProfile
      ._GET_FreelancersListProfile(
        10,
        true,
        param.num,
        getSearchKey.searchStatus,
        getSearchKey?.searchKey
      )
      .then((res) => {
        if (cancel) return;
        getSearchKey?.searchKey && setFlancersList(res.data);
        setFlancersList(res.data);
      })
      .catch((err) => {
        return err.response;
      });

    return () => {
      cancel = true;
    };
  }, [getSearchKey?.searchKey]);

  // useEffect(() => {
  //     const timeout = setTimeout(() => {
  //         if (!flancersList) {
  //             return listOfUsersAdvs
  //         }
  //     }, 100);
  //     return () => clearTimeout(timeout)
  // }, [flancersList, listOfUsersAdvs])

  // ? ------------------[[[START Block]]]-----------------
  //*TODO GET From API Response ==> Advertising Pagination

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
  // TODO GET From API Response ==> Advertising Pagination
  // ? ------------------[[[END Block]]]-----------------
  // Todo Set Current Page
  const getPageNumber = (e, value) => {
    setCurrentPage(param.num);
    navigate(`/employed/page=${value}`);
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

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
      {flancersList?.data.length !== 0 ? (
        <div className={cls.container}>
          <div className={cls.holder}>
            <DynamicFilter
              isEmployee={true}
              mostUse={mostUse}
              categories={categories}
            />
            <div className="cLT-white-bg p-3 ">
              {flancersList?.data?.map((list, idx) => {
                return (
                  <NavLink
                    className="uLT-list-style"
                    to={`/employed/freelancer-profile/${list?.id}`}
                    key={idx}
                  >
                    {" "}
                    <FlancerEmployedListCard data={list} />{" "}
                  </NavLink>
                );
              })}
            </div>
          </div>
          {/* Pagination [Holder] */}
          <div className="container d-flex justify-content-center pt-4 mt-auto">
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
    </>
  );
};

export default Employed;
