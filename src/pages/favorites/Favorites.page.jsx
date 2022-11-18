import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle.component";
import Product from "../../components/product/Product.component";
import { customerActions } from "../../store/customer";

const Favorites = () => {
    const navigate = useNavigate()
  const dispatch  = useDispatch()
  const favorites = useSelector((state) => state.customer.customerData);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/favorites")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        
      });
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`/favorites/${id}`)
      .then(() => {
         let favor = favorites.filter(
           (fav) => fav.idproduct !== id
         );
         dispatch(customerActions.updateCustomerData(favor));
         let newData = [...data]
         newData = newData.filter((prod)=> prod.idproducts !== id)
         setData(newData)
      })
      .catch(() => {});
  };

  const openProduct = (id)=>{
    navigate(`/מוצר/${id}`)
  }
  return (
    <Fragment>
      <PageTitle title="מועדפים" />
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-3">
          {data &&
            data.map((prod, idx) => (
              <div className="col" key={idx}>
                <Product
                  {...prod}
                  favorite={true}
                  onUnsetFavor={handleRemove}
                  onOpenProduct={openProduct}
                />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};
export default Favorites;
