import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminProduct from "../adminProduct/AdminProduct";
import ConfirmDelete from "../confirmDelete/ConfirmDelete.component";
import Loading from "../loading/Loading.component";

const AdminProducts = () => {
  const [data, setData] = useState([]);
  const [confirmDelete,setConfirmDelete] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("/products")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        toast.error("משהו השתבש")
      });
  }, []);

  const addProduct = ()=>{
    navigate("/admin/add")
  }

  const editCard = (id)=>{
    navigate(`/admin/edit/${id}`)
  }
  const deleteCardConfirmation = (obj)=>{
    setConfirmDelete({...obj})
  }
  const cancelDelete = ()=>{
    setConfirmDelete(null)
  }
  const deleteProduct=(id)=>{
     axios.delete(`/products/${id}`).then(() => {
       toast.done("נמחק בהצלחה");
       let d = [...data]
       d = d.filter((prod) => prod.idproducts !== id);
       setData(d)
       setConfirmDelete(null)
     })
     .catch(()=>{
      toast.error("משהו השתבש")
      setConfirmDelete(null)
     })
  }
  const openProduct = (id)=>{
    navigate(`/admin/product/${id}`)
  }
  return (
    <Fragment>
      <h1 className="text-center">מוצרים</h1>
      <div className="container">
        <button className="btn btn-outline-warning" onClick={addProduct}>הוסף מוצר <span className="fw-bold">+</span></button>
        <div className="mt-4">
          {data[0] ?
          <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
            {data && data.map((prod,idx)=>(
                <div className="col" key={idx}>
                    <AdminProduct {...prod} onDelete={deleteCardConfirmation} onEdit={editCard} onOpenProduct={openProduct} />
                </div>
            ))}
          </div>: <Loading/>}
        </div>
      </div>
      {confirmDelete && <ConfirmDelete {...confirmDelete} onCancel={cancelDelete} onDelete={deleteProduct}/>}
    </Fragment>
  );
};

export default AdminProducts;
