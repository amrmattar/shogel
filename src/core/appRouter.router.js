import FlancerAdvsDetailsPage from "../pages/FlancerPages/FlancerAdvertisingPage/FlancerAdvsDetailsPage/FlancerAdvsDetailsPage.page";
import loadable from "@loadable/component";
import AuthForgetPassword from "../components/auth/forgetPassword/AuthForgetPassword/AuthForgetPassword.component";
import CommentDash from "../Dash/CommentDash";
import RegistrationStepsPage from "../pages/authPage/RegistrationPage/RegistrationSteps.page";
import RegistrationMobileComponent from "../components/auth/forgetPassword/CheckMobile/RegistrationMobile.component";
import RegistrationCycelComponent from "../components/auth/Register/RegistrationCycel.component";
import RegistrationStepsProviderPage from "../pages/authPage/RegistrationPage/RegistrationStepsPrivider/RegistrationStepsProvider.page";
import PoliciesPage from "../pages/Policies/Policies.page";
import NewSkillPage from "../Dash/FormStep/SkillsComp/NewSkillsPage";
import DescriptionPage from "../Dash/FormStep/NewModules/DefscriptionPage";
import CommonQuestionsPage from "../pages/CommonQuestions/CommonQuestions.page";
import Chat from "../components/ChatPage/Chat";

const HomeLoadable = loadable(() => import("../pages/Home/Home.page"), {
  fallback: <div>Loading</div>,
});

const SideNavPage = loadable(
  () => import("../pages/sideNavPage/SideNavPage.page/SideNavPage.page"),
  { fallback: <div>Loading</div> }
);

const FlancerAdvsListPageLoadable = loadable(
  () =>
    import(
      "../pages/FlancerPages/FlancerAdvertisingPage/FlancerAdvsListPage/FlancerAdvsListPage.page"
    ),
  { fallback: <div>Loading</div> }
);

const PageNotFoundLoadable = loadable(
  () => import("../pages/404Page/404.page"),
  { fallback: <div>Loading</div> }
);

const EmployedLoadable = loadable(
  () => import("../pages/Employed/Employed.page"),
  { fallback: <div>Loading</div> }
);

const ClientOfferPricePageLoadable = loadable(
  () => import("../pages/OfferPrice/ClientOfferPrice/ClientOfferPrice.page"),
  { fallback: <div>Loading</div> }
);

const FlancerAdvertisingOfferPageLoadable = loadable(
  () =>
    import(
      "../pages/OfferPrice/FlancerAdvertisingOffer/FlancerAdvertisingOffer.pages"
    ),
  { fallback: <div>Loading</div> }
);

const FlancerOfferPageLoadable = loadable(
  () => import("../pages/FlancerPages/FlancerOfferPage/FlancerOfferPage.page"),
  { fallback: <div>Loading</div> }
);

const OrdersPageLoadable = loadable(
  () => import("../pages/Orders/OrderPage/OrdersPage.page"),
  { fallback: <div>Loading</div> }
);

const OrderDetailsPageLoadable = loadable(
  () => import("../pages/Orders/OrderDetailsPage/OrderDetailsPage.page"),
  { fallback: <div>Loading</div> }
);

const FLancerProfileAndSideNavPage = loadable(
  () =>
    import(
      "../pages/FreelancerProfileAndSideNav/FLancerProfileAndSideNav.page"
    ),
  { fallback: <div>Loading</div> }
);

const DashLoadable = loadable(() => import("../Dash/dash"), {
  fallback: <div>Loading</div>,
});

const appRoutes = {
  data: [
    {
      path: "*",
      key: <PageNotFoundLoadable />,
    },
    {
      path: "/dash",
      // key: <CommentDash />
      key: <DashLoadable />,
    },
    {
      path: "/",
      key: <HomeLoadable />,
    },
    {
      path: `advertising/page=:num`,
      key: (
        <div className="d-flex flex-column flex-lg-row px-0 px-sm-3 px-lg-0 mDefault mx-2 mx-md-5">
          <SideNavPage />
          <FlancerAdvsListPageLoadable />
        </div>
      ),
    },
    {
      key: <FlancerAdvsDetailsPage />,
      path: "advertising/advertise-details/:id",
    },
    {
      path: "freelancer-offer/:id",
      key: <FlancerOfferPageLoadable />,
    },
    {
      path: "employed/freelancer-profile/:id",
      key: <FLancerProfileAndSideNavPage />,
    },
    {
      path: "employed/page=:num/*",
      key: (
        <div className="d-flex flex-column flex-lg-row px-0 px-sm-3 px-lg-0 mDefault mx-2 mx-md-5">
          <SideNavPage />
          <EmployedLoadable />
        </div>
      ),
    },
    {
      path: "orders/page=:num",
      key: (
        <div className="d-flex flex-column flex-lg-row px-0 px-sm-3 px-lg-0 mDefault mx-2 mx-md-5">
          <SideNavPage />
          <OrdersPageLoadable />
        </div>
      ),
    },
    {
      path: "orders/order-details/:id",
      key: (
        <div className="d-flex flex-column flex-lg-row px-0 px-sm-3 px-lg-0 mDefault mx-2 mx-md-5">
          {/* <SideOrderDetailsPage /> */}
          <OrderDetailsPageLoadable />
        </div>
      ),
    },
    {
      path: "offer-price",
      key: <ClientOfferPricePageLoadable />,
    },
    {
      path: "chat",
      key: <Chat />,
    },
    {
      path: "advertising-price",
      key: <FlancerAdvertisingOfferPageLoadable />,
    },
    {
      path: "forget-password",
      key: <AuthForgetPassword />,
    },
    {
      path: "register/*",
      key: <RegistrationStepsProviderPage />,
    },
    {
      path: "policies",
      key: <PoliciesPage />,
    },

    {
      path: "questions",
      key: <CommonQuestionsPage />,
    },
  ],
};

export default appRoutes;
