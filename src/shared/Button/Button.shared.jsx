import "./Button.shared.scss";

const ButtonShare = ({
  ID,
  innerText,
  textClasses,
  btnClasses,
  loading,
  type,
  btnType,
  onClick,
  iconName,
  style,
  onFocus,
  attrName,
  nohover,
  smBtn,
  iconSize,
}) => {
  return (
    <button
      id={ID}
      type={btnType}
      onClick={onClick}
      onFocus={onFocus}
      className={`btn w-100 ${btnClasses} ${
        nohover
          ? "btn-hover-transparent"
          : smBtn
          ? "btn_small_screen btn-hover-gray"
          : "hover"
      }`}
      disabled={type}
      name={attrName}
    >
      {iconName && (
        <i
          style={{ width: iconSize, height: iconSize }}
          className={`d-flex ${iconName} gap-2 p-2  uLT-img-contain`}
        ></i>
      )}
      <div className="d-flex align-items-center gap-2 justify-content-center gap-3">
        {loading && <div className="spinner" />}
        <p
          className={`m-0 ${smBtn ? "darken_sm_btn" : ""} ${textClasses}`}
          style={style}
        >
          {innerText}
        </p>
      </div>
    </button>
  );
};

export default ButtonShare;
