import { useState } from "react";
import PriceSlider from "../../../components/PriceFilter/price";
import CategoryHandler from "./CategoryHandler";
import CategoryMain from "./CategoryMain";
import cls from "./DynamicFilter.module.scss";
import { BiCurrentLocation } from "react-icons/bi";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const DynamicFilter = ({ mostUse, categories, isEmployee, isAdvert }) => {
  const [priceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });
  const [categ, setCateg] = useState(categories);
  const [rate, setRate] = useState(0);

  return (
    <div className={cls.main}>
      <p className={cls.search}>البحث</p>
      <input
        onChange={(e) =>
          setCateg(
            categories.filter((ele) => {
              return ele.title.includes(e.target.value);
            })
          )
        }
        className={cls.inp}
        placeholder="ابحث هنا"
        type="text"
      />
      {categ[0] && (
        <div>
          <p className={cls.search}>الاشغال و المجالات</p>
          {categ.map((ele) => (
            <CategoryMain ele={ele} />
          ))}
        </div>
      )}
      <div className={cls.location}>
        <p className={cls.search}>الموقع</p>
        <div className={cls.relative}>
          <div className={cls.locatIcon}>
            <BiCurrentLocation />
          </div>

          <input className={cls.inp} placeholder="ابحث هنا" type="text" />
        </div>
      </div>
      {(isAdvert || isEmployee) && (
        <div className={cls.rate}>
          <p className={cls.search}>التقييم</p>

          <Rating
            dir="ltr"
            size="large"
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />

          <p className={cls.search}>متصل</p>
          <div className={cls.swich}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
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
              title="نحديد السعر"
              changePrice={setPriceRange}
            />
          )}
          {isAdvert && (
            <PriceSlider
              quote="مراجعة"
              title="مراجعة"
              changePrice={setPriceRange}
            />
          )}
        </div>
      )}
      {mostUse[0] && (
        <div>
          <p className={cls.lastC}>الاكثر استخداما</p>
          {mostUse.map((ele) => (
            <CategoryHandler ele={ele} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DynamicFilter;
