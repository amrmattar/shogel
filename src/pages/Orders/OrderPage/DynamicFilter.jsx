import PriceSlider from "../../../components/PriceFilter/price";
import CategoryHandler from "./CategoryHandler";
import CategoryMain from "./CategoryMain";
import cls from "./DynamicFilter.module.scss";
import { BiCurrentLocation } from "react-icons/bi";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const DynamicFilter = ({
  mostUse,
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
}) => {
  return (
    <div className={cls.main}>
      <p className={cls.search}>البحث</p>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className={cls.inp}
        placeholder="ابحث هنا"
        type="text"
      />
      {categories[0] && (
        <div>
          <p className={cls.search}>الاشغال و المجالات</p>

          <div
            style={{ maxHeight: "50vh", overflow: "auto", marginBottom: 10 }}
            className="skills-overflow"
          >
            {categories.map((ele, idx) => (
              <CategoryMain key={idx} setCategory={setCategory} ele={ele} />
            ))}
          </div>
        </div>
      )}
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
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />

            {rate > 0 && (
              <p
                onClick={() => setRate(null)}
                style={{ cursor: "pointer" }}
                className="text-primary m-0 me-3"
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
      {mostUse[0] && (
        <div>
          <p className={cls.lastC}>الاكثر استخداما</p>
          {mostUse.map((ele, idx) => (
            <CategoryHandler key={idx} ele={ele} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DynamicFilter;
