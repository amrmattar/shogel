import PriceSlider from "../../../components/PriceFilter/price";
import CategoryHandler from "./CategoryHandler";
import CategoryMain from "./CategoryMain";
import cls from "./DynamicFilter.module.scss";
import { BiCurrentLocation } from "react-icons/bi";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import SkillTree from "../../../Dash/FormStep/SkillsComp/SkillTree";
import { useEffect, useState } from "react";
import FilterPhoneView from "./FilterPhoneView";
import axios from "axios";

const attendees = [
  { key: "offline", name: "بالحضور" },
  { key: "online", name: "عن بعد" },
  { key: "all", name: "الجميع" },
];

const DynamicFilter = ({
  mostUse,
  categories,
  isEmployee,
  isAdvert,
  isOrders,
  setCategory,
  setPrice,
  setLocation,
  location,
  setRate,
  setActive,
  setRateCount,
  query,
  setQuery,
  rate,
  activesId,
  resetCateg,
  resetMost,
  setMostUseId,
  mostUseId,
  checkedSkls,
  isFilterOpen,
  setIsFilterOpen,
  setAttendeesStatus,
  attendeesStatus,
}) => {
  const [searchRes, setSearchRes] = useState([]);
  const [hisCountry, setHisCountry] = useState();

  const choseSkillWithChildrenHandler = (id) => {
    const get_all_children_ids = (nodes, target_id) => {
      let children_ids = [];
      for (let node of nodes) {
        if (node.id === target_id) {
          for (let child of node.children) {
            children_ids.push(child.id);
            children_ids.push(...get_all_children_ids(nodes, child.id));
          }
          break;
        } else {
          children_ids.push(...get_all_children_ids(node.children, target_id));
        }
      }
      return children_ids;
    };

    const getAllChildrenOfId = get_all_children_ids(categories, id);
    setCategory([...getAllChildrenOfId, id]);
  };

  useEffect(() => {
    if (query) {
      const newCategories = categories.filter((categorie) =>
        categorie.name.startsWith(query)
      );
      setSearchRes(newCategories);
    } else {
      setSearchRes([]);
    }
  }, [query, categories]);

  // get his country
  useEffect(() => {
    const getHisCountry = async () => {
      const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
      };

      getCoords().then(async ({ lat, lon }) => {
        const hisCountryUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ar&key=AIzaSyAeMiz0Z5VKOjU4TUxh-2RgZt7PnWQXxoQ`;

        const { data: hisDataCountry } = await axios(hisCountryUri);

        let country = "sa";

        if (hisDataCountry?.status == "OK") {
          if (hisDataCountry?.results[1]) {
            //find country name
            for (
              var i = 0;
              i < hisDataCountry?.results[0].address_components.length;
              i++
            ) {
              for (
                var b = 0;
                b <
                hisDataCountry?.results[0].address_components[i].types.length;
                b++
              ) {
                if (
                  hisDataCountry?.results[0].address_components[i].types[b] ==
                  "country"
                ) {
                  //this is the object you are looking for
                  country =
                    hisDataCountry?.results[0].address_components[i]?.long_name;
                  break;
                }
              }
            }

            // set country code
            setHisCountry(country);
          }
        }
      });
    };

    getHisCountry();
  }, []);

  // set country to filter
  useEffect(() => {
    if (!hisCountry) return;

    setLocation(hisCountry || "");
  }, [setLocation, hisCountry]);

  return (
    <>
      <div className={cls.main + " d-md-block d-none"}>
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
              style={{ maxHeight: "50vh", overflow: "auto", marginBottom: 10 }}
              className="skills-overflow"
            >
              {categories.length ? (
                <SkillTree
                  customTree
                  checkedSkls={activesId}
                  addChosedSkils={choseSkillWithChildrenHandler}
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
        )}
        <div className={cls.location}>
          <p className={cls.search}>الموقع</p>
          <div className={cls.relative}>
            <div className={cls.locatIcon}>
              <BiCurrentLocation />
            </div>

            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
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
        {mostUse?.[0] && (
          <div>
            <header
              className={` d-flex border-top border-dark pt-2 justify-content-between align-items-center mb-2`}
            >
              <p className={`m-0 ${cls.lastC} p-0 border-0`}>الاكثر استخداما</p>

              {mostUseId?.length > 0 && (
                <p
                  onClick={resetMost}
                  style={{ cursor: "pointer" }}
                  className="text-primary m-0 me-3"
                >
                  اعادة تعيين
                </p>
              )}
            </header>

            {mostUse?.map((ele, idx) => (
              <CategoryHandler
                isChecked={mostUseId?.includes(ele.id)}
                changeState={(id, check) =>
                  setMostUseId?.((prev) => {
                    if (check) return [...prev, id];

                    return [...prev.filter((ele) => ele != id)];
                  })
                }
                key={idx}
                ele={ele}
              />
            ))}
          </div>
        )}
        {isOrders && (
          <article className="online-offline">
            <div>
              <header
                className={` d-flex border-top border-dark pt-2 justify-content-between align-items-center mb-2`}
              >
                <p className={`m-0 ${cls.lastC} p-0 border-0`}>حالة الحضور</p>
              </header>

              <div className="radios">
                {attendees.map((ele, idx) => (
                  <article className="mb-2 d-flex justify-content-start align-items-center">
                    <input
                      id={ele.key}
                      value={ele.key}
                      onChange={(e) => {
                        setAttendeesStatus(e.target.value);
                      }}
                      defaultChecked={ele.key === attendeesStatus}
                      type={"radio"}
                      name="attendees-status"
                      key={idx}
                      className="ms-2"
                    />

                    <label className="text-muted m-0" htmlFor={ele.key}>
                      {ele.name}
                    </label>
                  </article>
                ))}
              </div>
            </div>
          </article>
        )}
      </div>

      <FilterPhoneView
        mostUse={mostUse}
        categories={categories}
        isEmployee={isEmployee}
        isAdvert={isAdvert}
        setCategory={choseSkillWithChildrenHandler}
        setPrice={setPrice}
        setLocation={setLocation}
        setRate={setRate}
        setActive={setActive}
        setRateCount={setRateCount}
        query={query}
        setQuery={setQuery}
        rate={rate}
        activesId={activesId}
        resetCateg={resetCateg}
        resetMost={resetMost}
        setMostUseId={setMostUseId}
        mostUseId={mostUseId}
        checkedSkls={checkedSkls}
        isFilterOpen={isFilterOpen}
        searchRes={searchRes}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );
};
export default DynamicFilter;
