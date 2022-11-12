import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlancerTabsControllerShared from "../../../../shared/FlancerController/FlancerTabsControllerPills.shared/FlancerTabsController.shared";
import { Pagination, Stack } from "@mui/material";
import RequestsMade from "./RequestsMade";
import HireMeRequests from "./HireMeRequests";

const FlancerMyPillsPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [tabsSelected, setTabsSelected] = useState();
  const [myOfferListPagination, setMyOfferPagination] = useState();
  const [offerFilter, setOfferFilter] = useState(null);

  const [tabType, setTabType] = useState("RequestsMade");

  const getAllOfferTasksList = useCallback(() => {
    if (tabsSelected === "hireMeRequests") {
      return setTabType("hireMeRequests");
    } else if (tabsSelected === "RequestsMade") {
      return setTabType("RequestsMade");
    }
  }, [tabsSelected]);

  useEffect(() => {
    getAllOfferTasksList();
  }, [getAllOfferTasksList]);

  const children = {
    hireMeRequests: (
      <HireMeRequests
        offerStatus={offerFilter}
        setPagination={setMyOfferPagination}
      />
    ),
    RequestsMade: (
      <RequestsMade
        offerStatus={offerFilter}
        setPagination={setMyOfferPagination}
      />
    ),
  };

  // ? ------------------[[[START Block]]]-----------------
  //*TODO GET From API Response ==> Advertising Pagination
  const [pagination, setPagination] = useState();
  const handleAdvsPagination = useCallback(() => {
    setPagination(myOfferListPagination?.pagination?.total_pages);
  }, [myOfferListPagination?.pagination]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!myOfferListPagination?.pagination) {
        return handleAdvsPagination;
      }
    }, 1200);
    return clearTimeout(timeout);
  }, [myOfferListPagination?.pagination, handleAdvsPagination]);

  // TODO GET From API Response ==> Advertising Pagination
  // Todo Set Current Page
  const getPageNumber = (e, value) => {
    navigate(`/account_management/my-order/2/page=${value}`);
    window.scrollTo({
      top: 480,
      behavior: "smooth",
    });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-between gap-3 h-100">
      <div className="w-100">
        <FlancerTabsControllerShared
          children={children}
          Datafilter={setOfferFilter}
          tabSelect={setTabsSelected}
          selectedTap={tabType}
          isPills
        />
      </div>
      {pagination !== 0 && (
        <div className="container d-flex justify-content-center align-items-center ">
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
        </div>
      )}
    </div>
  );
};

export default FlancerMyPillsPage;
