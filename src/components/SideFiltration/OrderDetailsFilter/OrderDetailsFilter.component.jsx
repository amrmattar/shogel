import React from "react";
import "./OrderDetailsFilterComponent.scss";

const OrderDetailsFilterComponent = ({ detailsData }) => {
  console.log(detailsData);

  return (
    <>
      <div className="order-filter  d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between gap-2">
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            تفاصيل حالة الطلب
          </p>
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            {detailsData?.status?.name || "لا يوجد"}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            عدد العروض
          </p>
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            {detailsData?.offer?.length}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            المكان
          </p>
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            {detailsData?.country?.name}, {detailsData?.city?.name}{" "}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            تاريخ النشر
          </p>
          <p className="m-0 cLT-support2-text fLT-Regular-sB text-nowrap">
            قبل {detailsData?.created_at_value}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderDetailsFilterComponent);
