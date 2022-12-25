const LocationHandler = ({ setState, country, city, state, area }) => {
  return (
    <div className="locationStateHandler">
      <h5>موقع الشغل</h5>
      <div className="d-flex flex-wrap mb-3 mb-md-0">
        <p>{country},</p>
        <p>{city},</p>
        <p>{state},</p>
        <p>{area},</p>
        <span onClick={setState}>تغيير الموقع</span>
      </div>
    </div>
  );
};
export default LocationHandler;
