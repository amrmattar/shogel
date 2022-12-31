import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.scss";
import { Box } from "@mui/system";
import ButtonShare from "../../../shared/Button/Button.shared";

const MopileNavigate = ({ isOpen, setIsOpen, pages, userID }) => {
  return (
    <article
      className={`${style.mopile_navigate} ${isOpen ? style.active : ""}`}
    >
      <div className="container py-3">
        <header>
          <IconButton
            className="text-light py-0"
            style={{ height: "fit-content" }}
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon color="#fff" />
          </IconButton>

          <div className="img">
            <NavLink
              style={{
                display: "block",
                width: 100,
                height: 100,
              }}
              to="/"
              className="imLT-main-logo uLT-img-position-contain col mx-auto px-0"
              aria-label="main-logo"
            />
          </div>
        </header>

        <div className="body mt-3">
          <Box>
            {pages.map((page, idx) => (
              <NavLink
                key={idx}
                onClick={() => setIsOpen(false)}
                to={page.route}
                className="text-light border-bottom d-block text-decoration-none pb-3 pt-2"
              >
                {page.name}
              </NavLink>
            ))}

            {(userID?.role?.id == 3) | (userID?.role?.id == 4) ? (
              <div className="mt-5 pt-5">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/chat"
                  className="text-light border-bottom d-block text-decoration-none container-fluid"
                >
                  <div
                    style={{ width: 45, height: 45 }}
                    className="ms-3 btn text-light d-flex justify-content-center align-items-center border-2 rounded-4"
                  >
                    <IconButton className="position-relative me-2 d-flex justify-content-center align-items-center">
                      <img width={20} src="/icons/comment.svg" alt="" />
                    </IconButton>

                    <p className="m-0">الرسائل</p>
                  </div>
                </NavLink>

                <NavLink
                  onClick={() => setIsOpen(false)}
                  to={`/account_management/my-notification/${0}`}
                  className="text-light border-bottom d-block text-decoration-none container-fluid"
                >
                  <div
                    style={{ width: 45, height: 45 }}
                    className="ms-3 btn text-light d-flex justify-content-center align-items-center border-2 rounded-4"
                  >
                    <IconButton className="position-relative me-4 d-flex justify-content-center align-items-center">
                      <img width={20} src="/icons/Notification.svg" alt="" />
                    </IconButton>

                    <p className="m-0">الاشعارات</p>
                  </div>
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </Box>

          <div
            className="btns d-flex flex-column justify-content-end align-items-center"
            style={{
              height: "calc(100vh - 390px - 10rem)",
            }}
          >
            <div className="LT-searchBar-button w-100">
              <NavLink to="/offer-price">
                <div className="shadow uLT-f-radius-sB">
                  <ButtonShare
                    btnClasses="cLT-secondary-bg p-1 h40  uLT-f-radius-sB mb-3"
                    textClasses={`px-md-4 cLT-white-text fLT-Regular-sA`}
                    innerText="اطلب عرض سعر"
                  />
                </div>
              </NavLink>
            </div>

            {(userID?.role?.id == 3) | (userID?.role?.id == 4) ? (
              <NavLink
                style={{
                  backgroundColor: "#1EAAAD",
                }}
                to="/advertising-price"
                className="btn cLT-main-bg py-2 px-0 uLT-f-radius-sB w-100"
              >
                <p className="mb-0 px-4 cLT-white-text fLT-Regular-sC">
                  اضف اعلان
                </p>
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MopileNavigate;
