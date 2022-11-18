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
const messageRole = {
  message: Joi.string().min(5).max(1000).required(),
};
const subjectRole = {
  subject: Joi.string().min(2).max(50).required(),
};

const contuctUsSchema = {
    ...nameRole,
    ...emailRole,
    ...phoneNumberRole,
    ...messageRole,
    ...subjectRole
}

export default contuctUsSchema