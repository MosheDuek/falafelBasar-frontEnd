import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const AdminProduct = ({
  idproducts,
  name,
  price,
  img_link,
  short_description,
  onEdit,
  onDelete,
  onOpenProduct
}) => {

    const handleClick = (ev)=>{
        onOpenProduct(idproducts)
    }
    const handleDeleteClick = (ev)=>{
         ev.stopPropagation();
         onDelete({id:idproducts,name})
    }
    const handleEditClick = (ev)=>{
         ev.stopPropagation();
         onEdit(idproducts)
    }
  return (
    <Fragment>
      <div className="card pointer" onClick={handleClick}>
        <img
          src={`http://localhost:3001/imgs/product/${img_link}`}
          className="card-img-top"
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{short_description}</p>
          <p className="fw-bold">מחיר: {price}₪</p>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                onClick={handleEditClick}
                className="btn btn-warning w-100"
                title="ערוך"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
            <div className="col">
              <button
                onClick={handleDeleteClick}
                className="btn btn-danger w-100"
                title="מחק"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProduct