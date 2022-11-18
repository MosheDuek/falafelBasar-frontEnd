import { useState } from "react";
import { Fragment } from "react";
import Joi from "joi-browser";
import contuctUsSchema from "../../validation/contuctUs.validation";
import axios from "axios";
import { toast } from "react-toastify";

const ContuctUsForm = () => {
  const [data,setData] = useState({})
  const [error,setError] = useState(false)

  const handleNameChange = (ev)=>{
    setData({...data,name:ev.target.value})
  }
  const handleEmailchange = (ev)=>{
    setData({...data,email:ev.target.value})
  }
  const handlePhoneNumberchange = (ev)=>{
    setData({...data,phoneNumber:ev.target.value})
  }
  const handleSubjectChange = (ev)=>{
    setData({...data,subject:ev.target.value})
  }
  const handleMessageChange = (ev)=>{
    setData({...data,message:ev.target.value})
  }

  const handleSubmit = (ev)=>{
    ev.preventDefault()
    setError(false)
    
    const validatedValue = Joi.validate(data,contuctUsSchema,{abortEarly:false})

    if(!validatedValue.error){
      axios.post("/messages",data)
      .then(()=>{
        toast.success("ההודעה נשלחה בהצלחה")
        setData({})
      })
      .catch(()=>{
        toast.error("משהו השתבש")
      })
    }
    else{
      setError(true)
    }

  }
  

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                שם פרטי:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="שם פרטי"
                value={data.hasOwnProperty("name") ? data.name : ""}
                onChange={handleNameChange}
              />
              {data.hasOwnProperty("name") && data.name.length < 2 && (
                <div className="text-danger">שם חייב להיות לפחות 2 תווים</div>
              )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                כתובת מייל:
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={data.hasOwnProperty("email") ? data.email : ""}
                onChange={handleEmailchange}
              />
              {data.hasOwnProperty("email") &&
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  data.email
                ) === false && (
                  <div className="text-danger">מייל חייב להיות תקין</div>
                )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                מספר טלפון:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="052-345-6789"
                value={
                  data.hasOwnProperty("phoneNumber") ? data.phoneNumber : ""
                }
                onChange={handlePhoneNumberchange}
              />
              {data.hasOwnProperty("phoneNumber") &&
                /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(
                  data.phoneNumber
                ) === false && (
                  <div className="text-danger">טלפון צריך להיות תקין</div>
                )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                על מה נדבר:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="לדוגמה: הזמנה לאירוע"
                value={data.hasOwnProperty("subject") ? data.subject : ""}
                onChange={handleSubjectChange}
              />
              {data.hasOwnProperty("subject") && data.subject.length < 2 && (
                <div className="text-danger">חייב להיות לפחות 2 תווים</div>
              )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                תוכן ההודעה:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={data.hasOwnProperty("message") ? data.message : ""}
                onChange={handleMessageChange}
              ></textarea>
              {data.hasOwnProperty("message") && data.message.length > 1000 && (
                <div className="text-danger">מקסימום 1000 תווים</div>
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-outline-warning m-auto d-block w-50">שלח</button>
      </form>
      {error && <div className="text-danger">אחד הערכים שגוי</div>}
    </Fragment>
  );
};

export default ContuctUsForm;
