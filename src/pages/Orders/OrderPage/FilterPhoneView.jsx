import { Backdrop, Rating } from "@mui/material";
import React from "react";
import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import SkillTree from "../../../Dash/FormStep/SkillsComp/SkillTree";
import ButtonShare from "../../../shared/Button/Button.shared";
import cls from "./DynamicFilter.module.scss";
import StarIcon from "@mui/icons-material/Star";
import PriceSlider from "../../../components/PriceFilter/price";

const filters = [
  { name: "الاشغالات والمجالات", target: "works" },
  { name: "تحديد السعر", target: "prices" },
  { name: "الاكثر استخدام", target: "trending" },
];

const trendingOptions = [
  { name: "الاحدث", target: "" },
  { name: "الافراد", target: "" },
  { name: "الشركات", target: "" },
  { name: "بالقرب مني", target: "" },
  { name: "حسابات موثقه", target: "" },
  { name: "الاكثر ردا علي الطلبات", target: "" },
];

const FilterPhoneView = ({
  isFilterOpen,
  setIsFilterOpen,
  categories,
  isEmployee,
  isAdvert,
  setCategory,
  setPrice,
  setLocation,
  setRate,
  setActive,
  setRateCount,
  query,
  setQuery,
  rate,
  activesId,
  resetCateg,
  checkedSkls,
  searchRes,
}) => {
  const [currentFilter, setCurrentFilter] = useState(filters[0].target);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99 }}
        open={isFilterOpen}
        onClick={() => setIsFilterOpen(false)}
      />

      <div
        className={`${cls.phone_view} ${
          isFilterOpen ? cls.active : ""
        } d-md-none bg-white rounded-3 border`}
      >
        <header>
          <ul className="list-unstyled container-fluid gap-3 d-flex align-items-center justify-content-center py-3 mb-3">
            {filters.map((filter, idx) => (
              <li
                onClick={() => setCurrentFilter(filter.target)}
                key={idx}
                className={`${
                  filter.target === currentFilter ? "" : "text-muted"
                } cu-pointer small`}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </header>

        <div className="filter-body container-fluid">
          {currentFilter === filters[0].target ? (
            <>
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className={cls.inp}
                placeholder="ابحث هنا"
                type="text"
              />
              <div>
                <header className="d-flex justify-content-between align-items-center mb-2">
                  <p className={cls.search + " m-0"}>الاشغال و المجالات</p>

                  {activesId?.length > 0 && (
                    <p
                      onClick={resetCateg}
                      style={{ cursor: "pointer" }}
                      className="text-primary small m-0 me-3"
                    >
                      اعادة تعيين
                    </p>
                  )}
                </header>

                <div
                  style={{
                    maxHeight: "50vh",
                    overflow: "auto",
                    marginBottom: 10,
                  }}
                  className="skills-overflow"
                >
                  {categories.length ? (
                    <SkillTree
                      customTree
                      checkedSkls={activesId}
                      addChosedSkils={setCategory}
                      skills={query ? searchRes : categories}
                    />
                  ) : (
                    <p className="text-center">جاري التحميل...</p>
                  )}
                  {/* {categories.map((ele, idx) => (
              <CategoryMain
                key={idx}
                activesId={activesId}
                setCategory={setCategory}
                ele={ele}
              />
            ))} */}
                </div>
              </div>
            </>
          ) : currentFilter === filters[1].target ? (
            <article className="pb-5 mb-5">
              <div className={cls.location}>
                <p className={cls.search}>الموقع</p>
                <div className={cls.relative}>
                  <div className={cls.locatIcon}>
                    <BiCurrentLocation />
                  </div>

                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    className={cls.inp}
                    placeholder="ابحث هنا"
                    type="text"
                  />
                </div>
              </div>
              {(isAdvert || isEmployee) && (
                <div className={cls.rate}>
                  <p className={cls.search}>التقييم</p>

                  <div className="rate d-flex align-items-center">
                    <Rating
                      value={rate}
                      dir="ltr"
                      size="large"
                      name="simple-controlled"
                      onChange={(_, newValue) => {
                        setRate(newValue);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />

                    {rate > 0 && (
                      <p
                        onClick={() => setRate(null)}
                        style={{ cursor: "pointer" }}
                        className="text-primary small m-0 me-3"
                      >
                        اعادة تعيين
                      </p>
                    )}
                  </div>

                  <p className={cls.search}>متصل</p>
                  <div className={cls.swich}>
                    <label className="switch">
                      <input
                        onChange={(e) => setActive(e.target.checked ? 1 : 0)}
                        type="checkbox"
                      />
                      <span className="slider round"></span>
                    </label>
                    <p>مشتغلين متصلين بالانترنت فقط</p>
                  </div>
                </div>
              )}
              {(!isEmployee || isAdvert) && (
                <div className={cls.priceHold}>
                  {!isEmployee && (
                    <PriceSlider
                      quote="ريال"
                      title="تحديد السعر"
                      range={[0, 0]}
                      max={20000}
                      changePrice={setPrice}
                    />
                  )}
                  {isAdvert && (
                    <PriceSlider
                      quote="مراجعة"
                      title="مراجعة"
                      range={[0, 0]}
                      max={100}
                      changePrice={setRateCount}
                    />
                  )}
                </div>
              )}
            </article>
          ) : currentFilter === filters[2].target ? (
            <div className="trendingOptions mb-5 pb-5">
              <h2 className="fs-6 border-0">الاكثر استخداما</h2>

              {trendingOptions.map((option, idx) => (
                <div className="checked">
                  <input
                    type="radio"
                    id={`option-${idx}`}
                    value={option.target}
                    name="trendingOption"
                  />
                  <label
                    className="text-muted me-2 mb-2"
                    htmlFor={`option-${idx}`}
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>

        <footer>
          <div
            className={`${cls.handelBtns} mt-3 d-flex align-items-center justify-content-around gap-2 mb-3 flex-row-reverse flex-md-row`}
          >
            <div className="col-7">
              <ButtonShare
                onClick={() => setIsFilterOpen(false)}
                innerText={"حفظ"}
                btnClasses={"cLT-secondary-bg br14 py-3"}
                textClasses={"py-1 px-5 cLT-white-text fLT-Regular-sB"}
              />
            </div>
            <div className="col-4">
              <ButtonShare
                smBtn
                onClick={() => setIsFilterOpen(false)}
                innerText={"رجــــوع"}
                btnClasses={"three cLT-secondary-bg py-3"}
                textClasses={"py-1 px-3 px-md-5 rounded-5"}
              />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FilterPhoneView;
