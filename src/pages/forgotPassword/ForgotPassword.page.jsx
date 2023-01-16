import { useState } from "react";
import { Fragment } from "react";
import Joi from "joi-browser";
import PageTitle from "../../components/pageTitle/PageTitle.component";
import forgotPasswordSchema from "../../validation/forgotPassword.validation";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEamil] = useState("");
  const handleEmailChange = (ev) => {
    setEamil(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validatedValue = Joi.validate({ email }, forgotPasswordSchema, {
      abortEarly: false,
    });
    if (validatedValue.error) {
      toast.error("מייל חייב להיות תקין");
    } else {
      axios
        .post("/admin/forgot-password", { email: validatedValue.value.email })
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          toast.success("במידה והמייל אכן קיים בדקות הקרובות תקבל מייל לשחזור");
        });
    }
  };

  return (
    <Fragment>
      <PageTitle title="שכחתי סיסמה" />

      <div className="container custom-body mt-3 m-auto col-12 col-md-6 col-xl-4">
        <div className="w-100">
          <form onSubmit={handleSubmit} className="text-dark">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="floatingInput">מייל</label>
            </div>
            <button className="btn btn-outline-warning m-auto d-block">
              שלח לי מייל לשחזור
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
