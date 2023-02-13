import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userProfile } from "../../../../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import "./flancerNavigator.component.scss";

const FreelancerNavigators = (userID) => {
  return [
    {
      iconName: "iLT-my-edit",
      iconNameMain: "iLT-my-edit-main",
      innerText: "تعديل حسابي",
      to: `account_management/my-edit-account/${userID}`,
      name: "my-edit",
    },
    {
      iconName: "iLT-my-order",
      iconNameMain: "iLT-my-order-main",
      innerText: "طلباتي",
      to: `account_management/my-order/${userID}/page=${1}`,
      name: "my-order",
    },
    {
      iconName: "iLT-my-order",
      iconNameMain: "iLT-my-order-main",
      innerText: "طلبات العملاء",
      // id: "hireMeRequests",
      // toggle: "pill",
      to: `account_management/my-pills/${userID}/page=${1}`,
      name: "my-pills",
    },

    {
      iconName: "iLT-my-advs",
      iconNameMain: "iLT-my-advs-main",
      innerText: "إعلاناتي",
      to: `account_management/my-advertising/${userID}/page=${1}`,
      name: "my-advs",
    },

    {
      iconName: "iLT-my-notificate",
      iconNameMain: "iLT-my-notificate-main",
      innerText: "الاشعارات",
      to: `account_management/my-notification/${userID}`,
      name: "my-notificate",
    },

    {
      iconName: "iLT-my-favo",
      iconNameMain: "iLT-my-favo-main",
      innerText: " المفضلة",
      to: `account_management/my-favorite/${userID}/page=${1}`,
      name: "my-favo",
    },
    {
      iconName: "iLT-my-chat",
      iconNameMain: "iLT-my-chat-main",
      innerText: "الدردشه ",
      to: `/chat`,
      name: "my-chat",
    },
    // {
    //     iconName: 'iLT-my-wallet',
    //     iconNameMain: 'iLT-my-wallet-main',
    //     innerText: ' المحفظة الإلكترونية',
    //     to: `account_management/my-wallet/${userID}`,
    //     name: 'my-wallet'
    // },
    // {
    //     iconName: 'iLT-my-setting',
    //     iconNameMain: 'iLT-my-setting-main',
    //     innerText: '  اعدادات',
    //     to: `account_management/my-setting/${userID}`,
    //     name: 'my-setting'
    // },
    // {
    //     iconName: 'iLT-my-logout',
    //     iconNameMain: 'iLT-my-logout-main',
    //     innerText: '  تسجيل الخروج ',
    //     to: 'account_management/my-logout',
    //     name: 'my-logout'
    // },
  ];
};

const ClientNavigators = (userID) => {
  return [
    {
      iconName: "iLT-my-edit",
      iconNameMain: "iLT-my-edit-main",
      innerText: "تعديل حسابي",
      to: `account_management/my-edit-account/${userID}`,
      name: "my-edit",
    },
    {
      iconName: "iLT-my-order",
      iconNameMain: "iLT-my-order-main",
      innerText: "طلباتي",
      to: `account_management/my-order/${userID}/page=${1}`,
      name: "my-order",
    },
    // {
    //     iconName: 'iLT-my-advs',
    //     iconNameMain: 'iLT-my-advs-main',
    //     innerText: 'إعلاناتي',
    //     to: `account_management/my-advertising/${userID}/page=${1}`,
    //     name: 'my-advs'
    // },

    // {
    //     iconName: 'iLT-my-notificate',
    //     iconNameMain: 'iLT-my-notificate-main',
    //     innerText: 'الاشعارات',
    //     to: `account_management/my-notification/${userID}`,
    //     name: 'my-notificate'
    // },

    {
      iconName: "iLT-my-favo",
      iconNameMain: "iLT-my-favo-main",
      innerText: " المفضلة",
      to: `account_management/my-favorite/${userID}/page=${1}`,
      name: "my-favo",
    },
    // {
    //     iconName: 'iLT-my-wallet',
    //     iconNameMain: 'iLT-my-wallet-main',
    //     innerText: ' المحفظة الإلكترونية',
    //     to: `account_management/my-wallet/${userID}`,
    //     name: 'my-wallet'
    // },
    // {
    //     iconName: 'iLT-my-setting',
    //     iconNameMain: 'iLT-my-setting-main',
    //     innerText: '  اعدادات',
    //     to: `account_management/my-setting/${userID}`,
    //     name: 'my-setting'
    // },
    // {
    //     iconName: 'iLT-my-logout',
    //     iconNameMain: 'iLT-my-logout-main',
    //     innerText: '  تسجيل الخروج ',
    //     to: 'account_management/my-logout',
    //     name: 'my-logout'
    // },
  ];
};

const FlancerNavigatorComponent = () => {
  const userID = useSelector((state) => state.userData.id);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (userRole != null) return;

    userProfile._GET_ProfileData(userID).then((res) => {
      if (res?.data?.data?.role?.id) setUserRole(res?.data?.data?.role?.id);
    });
  }, [userRole, userID]);

  const HandleAccountView = useCallback(() => {
    if (!userRole) return <>Loading...</>;

    switch (userRole) {
      case 2:
        return ClientNavigators(userID).map((navigator, ix) => {
          return (
            <div className="d-flex align-items-center gap-3 " key={ix}>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `${navigator.iconNameMain}  uLT-img-contain iLT-sB `
                    : `${navigator.iconName} iLT-sB uLT-img-contain`
                }
                to={navigator.to}
                aria-label={navigator.name}
              ></NavLink>
              <NavLink
                aria-label={navigator.name}
                to={navigator.to}
                className={(navData) =>
                  navData.isActive
                    ? " fLT-Bold-sA cLT-main-text uLT-list-style"
                    : "fLT-Regular-sB cLT-support2-text uLT-list-style"
                }
              >
                <p className="mb-0 text-nowrap">{navigator.innerText}</p>
              </NavLink>
            </div>
          );
        });
      case 3:
        return FreelancerNavigators(userID)?.map((navigator, ix) => {
          return (
            <div className="d-flex align-items-center gap-3 " key={ix}>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `${navigator.iconNameMain}  uLT-img-contain iLT-sB `
                    : `${navigator.iconName} iLT-sB uLT-img-contain`
                }
                to={navigator.to}
                aria-label={navigator.name}
              ></NavLink>
              <NavLink
                aria-label={navigator.name}
                to={navigator.to}
                className={(navData) =>
                  navData.isActive
                    ? " fLT-Bold-sA cLT-main-text uLT-list-style"
                    : "fLT-Regular-sB cLT-support2-text uLT-list-style"
                }
              >
                <p className="mb-0 text-nowrap">{navigator.innerText}</p>
              </NavLink>
            </div>
          );
        });
      case 4:
        return FreelancerNavigators(userID)?.map((navigator, ix) => {
          return (
            <div className="d-flex align-items-center gap-3 " key={ix}>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `${navigator.iconNameMain}  uLT-img-contain iLT-sB `
                    : `${navigator.iconName} iLT-sB uLT-img-contain`
                }
                to={navigator.to}
                aria-label={navigator.name}
              ></NavLink>
              <NavLink
                aria-label={navigator.name}
                to={navigator.to}
                className={(navData) =>
                  navData.isActive
                    ? " fLT-Bold-sA cLT-main-text uLT-list-style"
                    : "fLT-Regular-sB cLT-support2-text uLT-list-style"
                }
              >
                <p className="mb-0 text-nowrap">{navigator.innerText}</p>
              </NavLink>
            </div>
          );
        });
      default:
        break;
    }
  }, [userRole, userID]);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    HandleAccountView();
    return () => {
      cancel = true;
    };
  }, [HandleAccountView, userRole]);

  return (
    <div className="d-flex flex-lg-column gap-3 LT-navigator-holder ">
      <HandleAccountView />
    </div>
  );
};

export default FlancerNavigatorComponent;
