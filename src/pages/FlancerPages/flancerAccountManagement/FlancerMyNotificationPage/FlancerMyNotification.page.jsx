import React, { useEffect, useState } from "react";
import FlancerNotificationComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerNotification/FlancerNotification.component";

import { Skeleton } from "@mui/material";
import { API } from "../../../../enviroment/enviroment/enviroment";

const FlancerMyNotificationPage = ({ setIsNotification }) => {
  const [notification, setNotification] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    const fetchNotif = async () => {
      const { data } = await API.get("/setting/notification/list");

      setNotification({ data: data?.data, isLoading: true });
      localStorage.setItem("notification_isShowen", true);
      setIsNotification(false);
    };

    fetchNotif();
  }, [setIsNotification]);

  return (
    <div className="pb-5 mt-5 mb-4">
      {notification.isLoading ? (
        notification.data.length > 0 ? (
          notification.data.map((notification, idx) => (
            <div className="mt-2" key={idx}>
              <FlancerNotificationComponent notification={notification} />
            </div>
          ))
        ) : (
          <div
            style={{ minHeight: "60vh" }}
            className="not-notification my-3 d-flex justify-content-center align-items-center flex-column"
          >
            <img width={45} src="/icons/noNotf.svg" alt="" />
            <p className="text-muted fs-4 mt-2">لا توجد اشعارات</p>
          </div>
        )
      ) : (
        <div className="loading pt-3">
          <Skeleton className="mt-5" variant="rectangular" height={100} />
          <Skeleton className="mt-5" variant="rectangular" height={100} />
          <Skeleton className="mt-5" variant="rectangular" height={100} />
        </div>
      )}
    </div>
  );
};

export default FlancerMyNotificationPage;
