import Joi from "joi-browser";

const nameRole = {
  name: Joi.string().min(2).max(255).trim().required(),
};
const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const phoneNumberRole = {
  phoneNumber: Joi.string().min(9).max(15).trim().required(),
};
const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};

const signUpSchema = {
  ...nameRole,
  ...emailRole,
  ...phoneNumberRole,
  ...passwordRole,
};

export default signUpSchema;
