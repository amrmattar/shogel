import "./Button.shared.scss";
const ButtonShare = ({
  ID,
  innerText,
  textClasses,
  btnClasses,
  loading,
  type,
  onClick,
  iconName,
  style,
  onFocus,
  attrName,
  nohover,
}) => {
  return (
    <button
      id={ID}
      onClick={onClick}
      onFocus={onFocus}
      className={`btn w-100 hover  ${btnClasses} ${
        nohover ? "btn-hover-transparent" : ""
      }`}
      disabled={type}
      name={attrName}
    >
      {iconName && (
        <i className={`d-flex  ${iconName} gap-2 p-2  uLT-img-contain`}></i>
      )}
      <div className="d-flex align-items-center gap-2 justify-content-center gap-3">
        {loading && <div className="spinner"></div>}
        <p className={`m-0  ${textClasses}`} style={style}>
          {innerText}
        </p>
      </div>
    </button>
  );
};

export default ButtonShare;
