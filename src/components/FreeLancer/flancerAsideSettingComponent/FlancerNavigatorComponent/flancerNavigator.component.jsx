import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./flancerNavigator.component.scss";
const FlancerNavigatorComponent = () => {
  const userID = useSelector((state) => state.userData.id);
  const [userRole] = useSelector((state) => [state.userRole]);
  const FreelancerNavigators = [
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
      iconName: "iLT-my-advs",
      iconNameMain: "iLT-my-advs-main",
      innerText: "إعلاناتي",
      to: `account_management/my-advertising/${userID}/page=${1}`,
      name: "my-advs",
    },

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
  const ClientNavigators = [
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
  const HandleAccountView = () => {
    switch (userRole?.userRole) {
      case "2":
        return ClientNavigators.map((navigator, ix) => {
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
      case "3":
        return FreelancerNavigators?.map((navigator, ix) => {
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
      case "4":
        return FreelancerNavigators?.map((navigator, ix) => {
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
  };
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    HandleAccountView();
    return () => {
      cancel = true;
    };
  }, [HandleAccountView, userRole?.userRole]);

  return (
    <div className="d-flex flex-lg-column gap-3 LT-navigator-holder ">
      <HandleAccountView />
    </div>
  );
};

export default FlancerNavigatorComponent;
