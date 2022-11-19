import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
import { updateProfile } from "../../../../core/services/userProfile/UpdateProfile/UpdateProfile.core";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";
import { Col, Form, Row } from "react-bootstrap";
import "./FlancerOtherJobSites.component.scss";
import { getSocialMedia } from "../../../../core/redux/reducers/SocialMediaReducer.core";
const FlancerOtherJobSitesComponent = ({ socialSite, data, checkupdate }) => {
  const dispatch = useDispatch();
  const [userID, messages] = useSelector((state) => [
    state.userData.id,
    state.messages,
  ]);
  const [socialLoading, setSocialLoading] = useState([]);
  const [socialData, setSocialData] = useState([]);

  // const handleChange = (e, id) => {
  //   const { name, value } = e.target;
  //   setSocialData((socialData) => ({ ...socialData, [name]: value }));
  // };

  const handelChange = ({ value, social_id, idx }) => {
    const newData = {
      value,
      social_id,
      idx,
    };

    setSocialData((prev) => {
      if (prev.find((social) => social.social_id === newData.social_id)) {
        const without = prev.filter(
          (social) => social.social_id !== newData.social_id
        );

        return [...without, newData];
      }

      return [...prev, newData];
    });
  };

  const handleSocial = (e, id, idx) => {
    e.preventDefault();
    const social = new FormData();

    dispatch(
      getMessages({
        messages: "جارى التحديث",
        messageType: "info",
        messageClick: true,
      })
    );
    socialData.forEach(({ social_id, idx, value }) => {
      social.append(`social[${idx}][social_id]`, social_id);
      social.append(`social[${idx}][value]`, value || socialLoading?.value);
    });

    updateProfile
      ._POST_UpdateProfile(userID, social)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res?.data?.message,
            messageType: "success",
            messageClick: true,
          })
        );
        checkupdate(false);
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err?.response?.data?.message,
            messageType: "error",
            messageClick: true,
          })
        );
        return err.response;
      });
  };

  useEffect(() => {
    if (socialLoading.length) return;

    data?.forEach((el) => {
      const currentSite = socialSite.find((site) => site.name === el.title);
      setSocialLoading((prev) => [
        ...prev,
        {
          ...el,
          social_id: currentSite.id,
          idx: currentSite.id - 1,
        },
      ]);
    });
  }, [data, socialSite, socialLoading]);

  useEffect(() => {
    if (!socialLoading.length) return;
    setSocialData(socialLoading);
  }, [socialLoading]);

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      {/* First Row [Name & Mobile & Email] */}
      {socialSite?.map((site, idx) => {
        return (
          <Form key={site.id}>
            <Row className="LT-other-site mb-3">
              {/* Site Name [Label] */}
              <div className="LT-site-title">
                <Form.Label
                  className="mb-0 fLT-Regular-sB cLT-support2-text "
                  name="social_id"
                >
                  {site.name === "facebook" ? "فيسبوك" : site.name}{" "}
                </Form.Label>
              </div>
              {/* Site Name [Input] */}
              <div className="d-flex LT-site-name position=relative">
                <i
                  className="iLT-upload uLT-img-contain iLT-sC uLT-click "
                  onClick={(e) => handleSocial(e, site.id, idx)}
                  style={{ position: "relative", top: "16px", right: "36px" }}
                />

                <Form.Control
                  name="value"
                  defaultValue={
                    socialLoading.find((social) => social.title === site.name)
                      ? socialLoading.find(
                          (social) => social.title === site.name
                        ).value
                      : ""
                  }
                  onChange={(e) =>
                    handelChange({
                      value: e.target.value,
                      social_id: site.id,
                      idx,
                    })
                  }
                  className="uLT-bd-f-platinum-sA  uLT-f-radius-sB"
                  dir="ltr"
                  placeholder="رابط الموقع"
                />
              </div>
            </Row>
          </Form>
        );
      })}
    </div>
  );
};

export default FlancerOtherJobSitesComponent;
