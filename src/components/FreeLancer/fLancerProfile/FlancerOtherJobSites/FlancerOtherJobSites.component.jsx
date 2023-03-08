import React, { useEffect } from "react";
import UserFeedBackShared from "../../../../shared/UserFeedBack/UserFeedBack.shared";

import { useSelector } from "react-redux";
import { Form, Row } from "react-bootstrap";
// import { getMessages } from "../../../../core/redux/reducers/Messages/Messages.core";
// import { updateProfile } from "../../../../core/services/userProfile/UpdateProfile/UpdateProfile.core";
// import { getSocialMedia } from "../../../../core/redux/reducers/SocialMediaReducer.core";

import "./FlancerOtherJobSites.component.scss";

const FlancerOtherJobSitesComponent = ({
  socialSite,
  setSocialData,
  socialLoading,
}) => {
  const [messages] = useSelector((state) => [state.messages]);

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

  useEffect(() => {
    const data = socialSite?.map((site) => ({
      social_id: site?.id,
      value:
        socialLoading.find((social) => social.title === site.name)?.value ||
        "__empty__",
    }));

    setSocialData(data);
  }, [setSocialData, socialSite, socialLoading]);

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />
      {/* First Row [Name & Mobile & Email] */}
      {socialSite?.map((site, idx) => (
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
            {/* <i
                className="iLT-upload uLT-img-contain iLT-sC uLT-click "
                onClick={(e) => handleSocial(e)}
                style={{ position: "relative", top: "16px", right: "36px" }}
              /> */}

            <Form.Control
              name="value"
              defaultValue={
                socialLoading.find((social) => social.title === site.name)
                  ? socialLoading.find((social) => social.title === site.name)
                      .value === "__empty__"
                    ? ""
                    : socialLoading.find((social) => social.title === site.name)
                        .value
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
              placeholder={site.name}
            />
          </div>
        </Row>
      ))}
    </div>
  );
};

export default FlancerOtherJobSitesComponent;
