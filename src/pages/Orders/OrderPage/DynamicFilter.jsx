import { useEffect } from "react";
import { useState } from "react";
import PriceSlider from "../../../components/PriceFilter/price";
import CategoryHandler from "./CategoryHandler";
import cls from "./DynamicFilter.module.scss";

const DynamicFilter = ({ mostUse, categories }) => {
  const [priceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });
  const [categ, setCateg] = useState(categories);
  const [inpValue, setInpValue] = useState("");
  // useEffect(() => {
  //   if (categories[0]) {
  //  let arr=   categories.filter((ele) => ele.title.contains(inpValue));
  //   }
  // }, [inpValue]);
 
  return (
    <div className={cls.main}>
      <p className={cls.search}>البحث</p>
      <input
        onChange={(e) =>
          setCateg(
            categories.filter((ele) => {
           return   ele.title.includes(e.target.value);
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
            <CategoryHandler ele={ele} />
          ))}
        </div>
      )}
      <div className={cls.location}>
        <p className={cls.search}>الموقع</p>

        <input className={cls.inp} placeholder="ابحث هنا" type="text" />
      </div>
      <div>
        <PriceSlider changePrice={setPriceRange} />
      </div>
      {mostUse[0] && (
        <div>
          <p className={cls.search}>الاكثر استخداما</p>
          {mostUse.map((ele) => (
            <CategoryHandler ele={ele} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DynamicFilter;
