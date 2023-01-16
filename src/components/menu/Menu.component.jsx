import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customerActions } from "../../store/customer";
import Product from "../product/Product.component";

const Menu = ({ sortBy }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const favorites = useSelector((state) => state.customer.customerData);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (sortBy === "0") {
      getProducts();
    }
    if (sortBy === "1") {
      axios
        .get("/products/cheap-to-exp")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(() => {
          toast.error("משהו השתבש");
        });
    }
    if (sortBy === "2") {
      axios
        .get("/products/exp-to-cheap")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(() => {
          toast.error("משהו השתבש");
        });
    }
  }, [sortBy]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === `${encodeURI("/בית")}`
    ) {
      axios
        .get("/products/home")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch(() => {
          navigate("/404");
        });
    } else {
      getProducts();
    }
  }, [loggedIn]);

  const getProducts = () => {
    axios
      .get("/products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((e) => {
        navigate("/404");
      });
  };

  useEffect(() => {
    setProducts(data);
  }, [favorites]);

  const setProducts = (data) => {
    if (loggedIn) {
      data.forEach((product) => {
        if (
          favorites[0] &&
          favorites.find((element) => element.idproduct === product.idproducts)
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
    navigate(`/מוצר/${id}`);
  };

  const setFavor = (id) => {
    if (loggedIn) {
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
    } else {
      toast.error("משתמש לא רשום");
    }
  };

  const unsetFavor = (id) => {
    if (loggedIn) {
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
    } else {
      toast.error("משתמש לא רשום");
    }
  };

  return (
    <Fragment>
      {data &&
        data.map((product, idx) => (
          <div className="col" key={idx}>
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
