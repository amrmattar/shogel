import cls from "./DynamicFilter.module.scss";
const RouteHandler = ({ data }) => {
  return (
    data?.length > 0 &&
    data.map((ele, index) => (
      <div className={cls.route}>
        <p>{ele}</p>
        {data[index + 1] && <p>{">"}</p>}
      </div>
    ))
  );
};
export default RouteHandler;
