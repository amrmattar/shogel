import "./FlancerCommentAndReviews.component.scss";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const FlancerCommentAndReviews = ({ reviews }) => {
  return (
    <>
      {/* Review Card [Holder] */}
      <div className="uLT-bd-f-platinum-sA uLT-f-radius-sB p-4 mb-4 LT-review-card">
        {/* Card [Title] */}
        <p className="mb-0 fLT-Bold-sm-sA pb-2">انشاء موقع الكتروني</p>
        <div className="d-flex justify-content-start aling-items-center">
          <div style={{ display: "flex" }}>
            <Rating
              dir="ltr"
              value={4.5}
              size="small"
              readOnly
              name="simple-controlled"
              precision={0.5}
              //   onChange={(event, newValue) => {
              //     setRate(newValue);
              //   }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <p style={{ margin: "0px 5px 0 0" }}>{4.5}</p>
          </div>
          {/* Card [Rating] */}
          <div dir="ltr">
            {/* <StarRatings rating={parseInt(reviews)} starRatedColor="#faaf00" starDimension="24px" numberOfStars={5} /> */}
          </div>
          <div className="mx-2"></div>
          <i
            className={`d-flex align-items-center iLT-Reviews-calendar p-0 uLT-img-contain iLT-sA mx-2 mt-1`}
          ></i>
          <p className="mb-0 cLT-support2-text fLT-Regular-sA">قبل 30 دقيقة</p>
        </div>
        {/* Card [Decription] */}
        <p className="m-0 cLT-smoke-text fLT-Regular-sB">
          متعاون جدًا وسريع في التواصل والتنفيذ .. وليست المرة الأولى نعمل معًا
          ولن تكون الأخيرة بإذن الله
        </p>
      </div>
    </>
  );
};
export default FlancerCommentAndReviews;
