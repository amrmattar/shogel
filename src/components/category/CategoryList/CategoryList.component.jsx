import "./CategoryList.component.scss";
const CategoryListComponent = ({ iconName, categoryName }) => {
  return (
    <>
      {/* Category Section Holder */}
      <ul className="d-flex justify-content-between pt-4 px-0">
        {/* Category Holder Loop */}
        <li className="d-flex flex-column align-items-center justify-content-center w-100">
          {/* Category Icon */}
          <i
            className={`${iconName} d-block uLT-img-contain LT-category-image `}
          ></i>
          {/* Category Name */}
          <span className="fLT-Bold-sB cLT-main-text">{categoryName}</span>
        </li>
      </ul>
    </>
  );
};

export default CategoryListComponent;
