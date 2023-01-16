import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import "./product.css";

const Product = ({
  name,
  short_description,
  img_link,
  price,
  idproducts,
  onSetFavor,
  onUnsetFavor,
  onOpenProduct,
  favorite,
}) => {
  const handleClick = () => {
    onOpenProduct(idproducts);
  };

  const handleFavor = () => {
    if (favorite) {
      onUnsetFavor(idproducts);
    } else {
      onSetFavor(idproducts);
    }
  };

  return (
    <Fragment>
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_DOMAIN}/imgs/product/${img_link}`}
              className="img-fluid shadow-filter responsive-round"
              alt={name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body text-end">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{short_description}</p>
              <p className="card-text text-start">
                <small className="text-muted fw-bold">
                  {price}
                  <span>₪</span>
                </small>
              </p>
            </div>
            <div className="card-footer text-start">
              <button
                onClick={handleClick}
                className="btn btn-outline-warning d-inline text-white"
              >
                מעבר למוצר
              </button>
              <FontAwesomeIcon
                icon={faStar}
                className={`pointer  me-1 ${
                  favorite ? "text-warning" : "text-secondary"
                }`}
                onClick={handleFavor}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
