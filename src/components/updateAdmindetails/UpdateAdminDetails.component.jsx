import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading.component";
import Joi from "joi-browser";
import updateAdminSchema from "../../validation/updateAdmin.validation";
import { toast } from "react-toastify";
import axios from "axios";
import useAfterLogin from "../../hooks/useAfterLogin";

const UpdateAdminDetails = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [data, setData] = useState({
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  });
  const afterUpdate = useAfterLogin();
  const handleNameChange = (ev) => {
    setData({ ...data, name: ev.target.value });
  };
  const handleEmailchange = (ev) => {
    setData({ ...data, email: ev.target.value });
  };
  const handlePhoneNumberchange = (ev) => {
    setData({ ...data, phoneNumber: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    const validateValue = Joi.validate(data, updateAdminSchema, {
      abortEarly: false,
    });
    if (validateValue.error) {
      setLoading(false);
      toast.error("אחד הערכים שגוי");
    } else {
      axios
        .put("/admin/update-details", data)
        .then(({ data }) => {
          setLoading(false);
          toast.success("פרטים עודכנו בהצלחה");
          afterUpdate(data.token);
        })
        .catch(() => {
          setLoading(false);
          toast.error("משהו השתבש. שים לב כי כל הפרטים נכונים");
        });
    }
  };

  return (
    <Fragment>
      <h1 className="my-3 text-center">עדכון פרטים אישיים</h1>
      <form className="container" onSubmit={handleSubmit}>
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
                value={data.hasOwnProperty("name") ? data.name : userData.name}
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
                value={
                  data.hasOwnProperty("email") ? data.email : userData.email
                }
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
                  data.hasOwnProperty("phoneNumber")
                    ? data.phoneNumber
                    : userData.phoneNumber
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
        </div>
        <button type="submit" className="btn btn-warning d-block w-50 m-auto">
          {loading ? <Loading /> : "עדכן"}
        </button>
      </form>
    </Fragment>
  );
};
export default UpdateAdminDetails;
