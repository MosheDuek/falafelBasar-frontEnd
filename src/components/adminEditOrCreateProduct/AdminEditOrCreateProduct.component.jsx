import "./adminEditOrCreateProduct.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../goBackButoon/GoBackButton.component";
import Joi from "joi-browser";
import productSchema from "../../validation/product.validation";
import { toast } from "react-toastify";

const AdminEditOrCreateProduct = () => {
  const params = useParams();
  const [axiosData,setAxiosData] = useState({})
  const [data, setData] = useState({});
  useEffect(() => {
    if(params){
    axios
      .get(`/products/${params.id}`)
      .then(({ data }) => {
        setAxiosData(data[0]);
        setData({name:data[0].name,description:data[0].description,price:data[0].price,shortDescription:data[0].short_description})
      })
      .catch((e) => {
        toast.error("משהו השתבש")
      });
    }
  }, []);

  const handleNameChange = (ev)=>{
      let d = {...data}
        setData({...d,name:ev.target.value})
    }
    const handleShortDescriptionChange = (ev)=>{
        let d = {...data}
        setData({...d, shortDescription:ev.target.value})
    }
    const handleDescriptionchange = (ev)=>{
        let d = {...data}
        setData({...d, description:ev.target.value})
    }
    const handlePriceChange = (ev)=>{
        let d = {...data}
        setData({...d, price:ev.target.value})
    }
    const handleImgChange = (ev)=>{
        setAxiosData({img_link:ev.target.files[0]})
    }

    const handleSubmit = (ev)=>{
      ev.preventDefault()
      const validatedValue = Joi.validate(data, productSchema, {
        abortEarly: false,
      });
if(validatedValue.error){
    toast.error("אחד הערכים לא תקין")
}
else{
      if (!params.hasOwnProperty("id") && !axiosData.img_link) {
        toast.error("חייב להוסיף תמונה למוצר");
    } else {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("shortDescription", data.shortDescription);
          formData.append("price", data.price);
          formData.append("prudImg", axiosData.img_link);
  
          if (params.hasOwnProperty("id")) {
            axios
              .put(`/products/${params.id}`, formData)
              .then(() => {
                toast.done("הועלה בהצלחה");
                window.history.back()
              })
              .catch(() => {
                toast.error("משהו השתבש");
              });
          } else {
            axios
              .post("/products", formData)
              .then(() => {
                toast.done("הועלה בהצלחה");
                window.history.back()
              })
              .catch(() => {
                toast.error("משהו השתבש");
              });
          }
        
      }
}

    }

  return (
    <Fragment>
      <div className="container p-4">
        <GoBackButton />
        <h1 className="text-center">
          {params.hasOwnProperty("id") ? "עריכת מוצר" : "העלאת מוצר"}
        </h1>
        {data && (
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  שם המוצר
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="פלאפל בשר"
                  value={data.hasOwnProperty("name") && data.name}
                  onChange={handleNameChange}
                ></input>
                {data.hasOwnProperty("name") && data.name.length < 2 && (
                  <span className="text-danger">
                    שם חייב להיות לפחות 2 תווים
                  </span>
                )}{" "}
                {data.hasOwnProperty("name") && data.name.length > 50 && (
                  <span className="text-danger">שם חייב להיות עד 50 תווים</span>
                )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  תיאור קצר
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                  value={
                    data.hasOwnProperty("shortDescription") &&
                    data.shortDescription
                  }
                  onChange={handleShortDescriptionChange}
                ></textarea>
                {data.hasOwnProperty("shortDescription") &&
                  data.shortDescription.length < 10 && (
                    <span className="text-danger">
                      שם חייב להיות לפחות 10 תווים
                    </span>
                  )}{" "}
                {data.hasOwnProperty("shortDescription") &&
                  data.shortDescription.length > 255 && (
                    <span className="text-danger">
                      תיאור קצר חייב להיות עד 255 תווים
                    </span>
                  )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlTextarea2"
                  className="form-label"
                >
                  תיאור
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea2"
                  rows="6"
                  value={data.hasOwnProperty("description") && data.description}
                  onChange={handleDescriptionchange}
                ></textarea>
                {data.hasOwnProperty("description") &&
                  data.description.length < 50 && (
                    <span className="text-danger">
                      תיאור חייב להיות לפחות 50 תווים
                    </span>
                  )}{" "}
                {data.hasOwnProperty("description") &&
                  data.description.length > 5000 && (
                    <span className="text-danger">
                      תיאור חייב להיות עד 5000 תווים
                    </span>
                  )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  מחיר בש"ח
                </label>
                <input
                  type="text"
                  className="form-control price"
                  id="exampleFormControlInput1"
                  placeholder="20₪"
                  value={data.hasOwnProperty("price") && data.price}
                  onChange={handlePriceChange}
                ></input>
                {data.hasOwnProperty("price") && data.price < 0 && (
                  <span className="text-danger">
                    מחיר חייב להיות מספר חיובי
                  </span>
                )}{" "}
                {data.hasOwnProperty("price") && data.price > 5000 && (
                  <span className="text-danger">
                    מחיר יכול להיות עד 10000 שח
                  </span>
                )}
              </div>
              <div className="col">
                <label htmlFor="formFile" className="form-label">
                  תמונת מוצר
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImgChange}
                ></input>
              </div>
            </div>
            <button className="btn btn-warning mt-4 w-50 d-block m-auto">
              שלח
            </button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default AdminEditOrCreateProduct;
