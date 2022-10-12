import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import appRoutes from "../../core/appRouter.router";
import UserValidta from "../../core/ISAuth.core";
import PrivateRoutes from "../../core/PrivateRoutes.core";
import FlancreAccountManagementPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerAccountManagement.page";
import FlancerMyAdvsPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyAdvsPage/FlancerMyAdvs.page";
import FlancerMyFavoritePage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyFavoritePage/FlancerMyFavorite.page";
import FlancerMyLogoutPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyLogoutPage/FlancerMyLogout.page";
import FlancerMyNotificationPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyNotificationPage/FlancerMyNotification.page";
import FlancerMyOrderPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyOrderPage/FlancerMyOrder.page";
import FlancerMySettingPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMySettingPage/FlancerMySetting.page";
import FlancerMyWalletPage from "../../pages/FlancerPages/flancerAccountManagement/FlancerMyWalletPage/FlancerMyWallet.page";
import FreelancerMainEditAccountPage from "../../pages/FreelancerMainEditAccount.page";
import ClientOfferPricePage from "../../pages/OfferPrice/ClientOfferPrice/ClientOfferPrice.page";
import FlancerAdvertisingOfferPage from "../../pages/OfferPrice/FlancerAdvertisingOffer/FlancerAdvertisingOffer.pages";

const MasterContainer = () => {
  const userID = useSelector((state) => state.userData.id);

  return (
    <>
      <div className="overflow-hidden w-100 ">
        <Routes>
          <Route
            path={`/advertising-price/:id`}
            element={<FlancerAdvertisingOfferPage />}
          />
          <Route
            path={`/update-offer-price/:id`}
            element={<ClientOfferPricePage />}
          />

          <Route element={<UserValidta />}>
            <Route
              path={`account_management/*`}
              element={<FlancreAccountManagementPage />}
            >
              <Route
                path={`my-edit-account/${userID}`}
                element={<FreelancerMainEditAccountPage />}
              />
              <Route element={<PrivateRoutes />}>
                <Route
                  path={`my-order/${userID}/page=:num`}
                  element={<FlancerMyOrderPage />}
                />
                <Route
                  path={`my-advertising/${userID}/page=:num`}
                  element={<FlancerMyAdvsPage />}
                />
                <Route
                  path={`my-notification/${userID}`}
                  element={<FlancerMyNotificationPage />}
                />
                <Route
                  path={`my-favorite/${userID}/page=:num`}
                  element={<FlancerMyFavoritePage />}
                />
                <Route
                  path={`my-wallet/${userID}`}
                  element={<FlancerMyWalletPage />}
                />
                <Route
                  path={`my-setting/${userID}`}
                  element={<FlancerMySettingPage />}
                />
                <Route path={"my-logout"} element={<FlancerMyLogoutPage />} />
              </Route>
              <Route
                path={"*"}
                element={<Navigate to={`my-edit-account/${userID}`} />}
              />
            </Route>
          </Route>
          {appRoutes.data.map((entry, index) => {
            return (
              <Route key={index} element={<PrivateRoutes />}>
                <Route path={entry?.path} element={entry?.key} />
              </Route>
            );
          })}
        </Routes>
      </div>
    </>
  );
};

export default MasterContainer;
