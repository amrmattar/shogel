import axios from "axios";
import React, { useEffect, useState } from "react";
import FlancerNotificationComponent from "../../../../components/FreeLancer/fLancerProfile/FlancerNotification/FlancerNotification.component";

import { Skeleton } from "@mui/material";
import { API } from "../../../../enviroment/enviroment/enviroment";

const notifications = [
  {
    id: 7,
    created_at: "23 Minute",
    title: "There is user need to approve",
    description: "user 1 need to approve",
    notifiable_type: "App\\Models\\User",
    notifiable_id: 2,
    pusher: null,
    receiver: {
      id: 2,
      username: "heba1222111",
      fullname: "heba",
      email: "heba@lun.sa111",
      mobile: "201115322000",
      role: "freelancer",
      available: 1,
      nationality_number: null,
      tax_number: null,
      commercial_number: null,
      job_name_id: {
        id: 1,
        name: "backend",
      },
      description: null,
      info: null,
      avatar: "http://localhost/shogol-backend/public/images/test.png",
      gender: {
        id: 1,
        name: "ذكر",
      },
      nationality: {
        id: 1,
        name: "سعودي",
        logo: "",
      },
      category: [],
      country: {
        id: 1,
        name: "السعودية",
      },
      city: {
        id: 1,
        name: "الرياض",
        country: {
          id: 1,
          name: "السعودية",
        },
      },
      state: {
        id: 1,
        name: "منطقه الرياض",
        country: {
          id: 1,
          name: "السعودية",
        },
        city: {
          id: 1,
          name: "الرياض",
          country: {
            id: 1,
            name: "السعودية",
          },
        },
      },
      language: [],
      skill: [],
      certificate: [],
      document: [],
      social: [],
      complete_profile: 61,
      profile_validation: 1,
      reverse: [
        {
          title: "email approve",
          status: 1,
        },
        {
          title: "mobile approve",
          status: 1,
        },
      ],
      rate: {
        rate: 2,
        count: 32,
      },
    },
  },
];

const FlancerMyNotificationPage = () => {
  const [notification, setNotification] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    const fetchNotif = async () => {
      const { data } = await API.get("/setting/notification/list");

      setNotification({ data: data?.data, isLoading: true });
    };

    fetchNotif();
  }, []);

  return (
    <div>
      {notification.isLoading ? (
        notification.length > 0 ? (
          notification.data.map((notification, idx) => (
            <div className="mt-5" key={idx}>
              <FlancerNotificationComponent notification={notification} />
            </div>
          ))
        ) : (
          <div
            className="not-notification my-3 d-flex justify-content-center align-items-center flex-column"
            style={{ minHeight: "60vh" }}
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
