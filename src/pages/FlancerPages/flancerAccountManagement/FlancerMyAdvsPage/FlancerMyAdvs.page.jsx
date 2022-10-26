import React, { useEffect, useMemo, useState } from "react";
import MyActiveAdvertisingComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerAdvertise/MyAdvsController/MyActiveAdvertising/MyActiveAdvertising.component";
import MyCancelAdvsListComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerAdvertise/MyAdvsController/MyCancelAdvsList/MyCancelAdvsList.component";
import { advertisingLists } from "../../../../core/services/AdvertisingOfferServices/AdvertisingOfferServices.core";
import FlancerAdvsControllerShared from "../../../../shared/FlancerController/FlancerAdvsController.shared/FlancerAdvsController.shared";
import "./FlancerMyAdvs.page.scss";

import { useNavigate, useParams } from "react-router-dom";
import AllAdvertisingControllerComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerAdvertise/MyAdvsController/AllMyAdvertising/AllAdvertisingController.component";
import MyExpiredAdvertisingComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerAdvertise/MyAdvsController/MyExpiredAdvertising/MyExpiredAdvertising.component";
import { Pagination, Stack } from "@mui/material";

const FlancerMyAdvsPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  // TODO Rest API Response Return All My Lists Of Advertising
  const [myAdvsData, setMyAdsData] = useState();
  const [advsStatusID, setAdvsStatusID] = useState([3, 7, 9]);
  const [refresh, setRefresh] = useState(false);

  const [advsResponseLoading, setAvdsResponseLoading] = useState(false);
  const myAdvsList = useMemo(() => {
    setAvdsResponseLoading(true);
    return advertisingLists
      ._GET_MyAdvsOffer(10, true, param.num, advsStatusID)
      .then((res) => {
        if (res.data.status === 1) {
          setAvdsResponseLoading(false);
          setMyAdsData(res.data);
        }
      })
      .catch((err) => {
        setAvdsResponseLoading(false);
        return err.response;
      });
  }, [param.num, advsStatusID]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (param.num) {
        return myAdvsList;
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [param.num, myAdvsList]);

  // ? ------------------[[[START Block]]]-----------------
  //*TODO GET From API Response ==> Advertising Pagination

  const [pagination, setPagination] = useState();

  const handleAdvsPagination = useMemo(() => {
    setPagination(myAdvsData?.pagination?.total_pages);
  }, [myAdvsData?.pagination]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!myAdvsData?.pagination) {
        return handleAdvsPagination;
      }
    }, 1200);
    return clearTimeout(timeout);
  }, [myAdvsData?.pagination, handleAdvsPagination]);
  // TODO GET From API Response ==> Advertising Pagination
  // ? ------------------[[[END Block]]]-----------------

  // ? ------------------[[[START Block]]]-----------------
  //*TODO GET From API Response ==> Advertising Status ID
  const [adStatus, setStatus] = useState({
    cancel_Status: Number,
    update_Status: Number,
    active_Status: Number,
  });
  const handleAdvsStatus = useMemo(() => {
    return myAdvsData?.data?.map((advsStatus) => {
      // Advertising Status Type [Active] ========= [ID: 3]
      if (advsStatus.status.id === 3) {
        setStatus((prevVal) => ({
          ...prevVal,
          active_Status: advsStatus.status.id,
        }));
      }
      // Advertising Status Type [Cancel] ========= [ID: 7]
      else if (advsStatus.status.id === 7) {
        setStatus((prevVal) => ({
          ...prevVal,
          cancel_Status: advsStatus.status.id,
        }));
      }
      // Advertising Status Type [Expired Time Or Date] ========= [ID: 9]
      else if (advsStatus.status.id === 9) {
        setStatus((prevVal) => ({
          ...prevVal,
          update_Status: advsStatus.status.id,
        }));
      }
    });
  }, [myAdvsData?.data]);
  useEffect(() => {
    if (!adStatus) {
      return handleAdvsStatus;
    }
  }, [adStatus]);
  // TODO GET From API Response ==> Advertising Status ID
  // ? ------------------[[[END Block]]]-----------------

  // Todo Set Current Page
  const getPageNumber = (e, value) => {
    navigate(`/account_management/my-advertising/2/page=${value}`);
    window.scrollTo({
      top: 480,
      behavior: "smooth",
    });
  };
  const [clickBoolen, setClickBoolen] = useState(false);
  const handleChangeTabs = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "showAllAds":
        setAdvsStatusID([3, 7, 9]);
        break;
      case "showActiveAds":
        setAdvsStatusID(3);
        break;
      case "showCancelAds":
        setAdvsStatusID(7);
        break;
      case "showExpiredAds":
        setAdvsStatusID(9);
        break;
      default:
        return setAdvsStatusID([3, 7, 9]);
    }
    window.scrollTo({
      top: 480,
      behavior: "smooth",
    });
  };
  const advsData = {
    myAllAdvsList: (
      <AllAdvertisingControllerComponent
        allAdvsRefresh={setRefresh}
        loading={advsResponseLoading}
        onChange={getPageNumber}
        allStatus={advsStatusID}
        data={myAdvsData?.data}
      />
    ),
    myActiveAdvsList: (
      <MyActiveAdvertisingComponent
        activeRefesh={setRefresh}
        activeStatus={adStatus.active_Status}
        loading={advsResponseLoading}
        onChange={getPageNumber}
        data={myAdvsData?.data}
      />
    ),
    myCancelAdsList: (
      <MyCancelAdvsListComponent
        cancelStatus={adStatus.cancel_Status}
        loading={advsResponseLoading}
        onChange={getPageNumber}
        data={myAdvsData?.data}
      />
    ),
    myExpiredAdsList: (
      <MyExpiredAdvertisingComponent
        expiresRefesh={setRefresh}
        updateStatus={adStatus?.update_Status}
        loading={advsResponseLoading}
        onChange={getPageNumber}
        data={myAdvsData?.data}
      />
    ),
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-between gap-3 h-100">
      <div className="px-3 w-100">
        <FlancerAdvsControllerShared
          onClick={(e) => handleChangeTabs(e)}
          children={advsData}
        />
      </div>
      <div className="container d-flex justify-content-center ">
        {myAdvsData?.data.length !== 0 && !advsResponseLoading && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default FlancerMyAdvsPage;
