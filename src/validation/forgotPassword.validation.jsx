import Joi from "joi-browser";

const forgotPasswordSchema = {
  email: Joi.string().email().max(64).required(),
};

export default forgotPasswordSchema;
