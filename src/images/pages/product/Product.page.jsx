import "./product.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading.component";
import PageTitle from "../../components/pageTitle/PageTitle.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customerActions } from "../../store/customer";
import GoBackButton from "../../components/goBackButoon/GoBackButton.component";

const Product = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.customer.customerData);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation()
  const [data, setData] = useState(null);
  const [fav,setFav] = useState("")
  useEffect(() => {
    axios
      .get(`/products/${params.id}`)
      .then(({ data }) => {
        setData(data[0]);
      })
      .catch((e) => {
        navigate("/404");
      });
  }, []);

  useEffect(()=>{
    if(data !== null && favorites){
    if (favorites.find((fav) => fav.idproduct === data.idproducts)) {
      setFav("text-warning");
    } else {
      setFav("text-secondary");
    }
}
  },[data])

  const handleFavClick = ()=>{
    if(!location.pathname.includes("admin")){
    if(loggedIn){
         if (favorites.find((fav) => fav.idproduct === data.idproducts)) {
           setFav("text-secondary");
           let favor = favorites.filter((fav) => fav.idproduct !== data.idproducts);
           dispatch(customerActions.updateCustomerData(favor));

            axios
              .delete(`/favorites/${data.idproducts}`)
              .then(() => {})
              .catch(() => {
                setFav("text-secondary");
              });

         } else {
           setFav("text-warning");
           let favor = [...favorites, { idproduct: data.idproducts }];
           dispatch(customerActions.updateCustomerData(favor));
           axios
             .post("/favorites", { idProduct: data.idproducts })
             .then(() => {})
             .catch(() => {
               setFav("text-warning");
             });
          
         }
    }
    else{
        toast.error("משתמש לא רשום")
    }
  }
  }
  return (
    <Fragment>
      {data ? (
        <Fragment>
          <PageTitle title={data.name} />
          <div className="container text-light product-container rounded my-3 p-5">
            <GoBackButton/>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col text-light">
                <div className="custom-product">
                  <div>
                    <div className="fw-bold">{data.short_description}</div>
                    <div>{data.description}</div>
                  </div>
                  <div className="fw-bold"> מחיר: {data.price}₪</div>
                </div>
              </div>
              <div className="col">
                <img src={`http://localhost:3001/imgs/product/${data.img_link}`} alt="" className="w-75" />
              </div>
            </div>
            {!location.pathname.includes("admin") &&
            <button
              onClick={handleFavClick}
              className="btn btn-outline-warning"
            >
              מועדפים
              <FontAwesomeIcon icon={faStar} className={`me-1 ${fav}`} />
            </button>
}
          </div>
        </Fragment>
      ) : (
        <div className="center-all">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

export default Product;
