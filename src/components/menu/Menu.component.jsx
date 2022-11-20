import "./menu.css"
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customerActions } from "../../store/customer";
import Product from "../product/Product.component";
import SearchBar from "../searchBar/SearchBar.component";

const Menu = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const favorites = useSelector((state) => state.customer.customerData);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const navigte = useNavigate();
  const location = useLocation()

  useEffect(() => {
   
    if(location.pathname === "/" || location.pathname === `${encodeURI("/בית")}`){
      axios
        .get("/products/home")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(() => {
          navigte("/404")
        });
    }
    else{
    axios
      .get("/products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((e) => {
        navigte("/404")
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    setProducts(data);
  }, [favorites]);

  const setProducts = (data) => {
    if (loggedIn) {
      data.forEach((product) => {
        if (
          favorites[0] && favorites.find((element) => element.idproduct === product.idproducts)
        ) {
          product.favorite = true;
        } else {
          product.favorite = false;
        }
      });
    } else {
      setData([...data]);
    }
    setData([...data]);
  };

  const openProduct = (id) => {
    navigte(`/מוצר/${id}`);
  };

  const setFavor = (id) => {
    if(loggedIn){
    if (!favorites.find((fav) => fav.idproduct === id)) {
      let favor = [...favorites, { idproduct: id }];
      dispatch(customerActions.updateCustomerData(favor));
    }

    axios
      .post("/favorites", { idProduct: id })
      .then(() => {})
      .catch(() => {
        let favor = favorites.filter((fav) => fav.idproduct === id);
        dispatch(customerActions.updateCustomerData(favor));
      });
    }
    else{
      toast.error("משתמש לא רשום")
    }
  };

  const unsetFavor = (id) => {
    if(loggedIn){
    if (favorites.find((fav) => fav.idproduct === id)) {
      let favor = favorites.filter((fav) => fav.idproduct !== id);
      dispatch(customerActions.updateCustomerData(favor));
    }
    axios
      .delete(`/favorites/${id}`)
      .then(() => {})
      .catch(() => {
        let favor = [...favorites, { idproduct: id }];
        dispatch(customerActions.updateCustomerData(favor));
      });
    }
    else{
      toast.error("משתמש לא רשום")
    }
  };

  return (
    <Fragment>
      <SearchBar/>
      {data &&
        data.map((product, idx) => (
          <div
            className={`col ${
              location.pathname !== "/%D7%AA%D7%A4%D7%A8%D7%99%D7%98"? "menucol":""
            }`}
            key={idx}
          >
            <Product
              {...product}
              onOpenProduct={openProduct}
              onSetFavor={setFavor}
              onUnsetFavor={unsetFavor}
            />
          </div>
        ))}
    </Fragment>
  );
};

export default Menu;
