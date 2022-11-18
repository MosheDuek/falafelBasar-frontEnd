import Joi from "joi-browser";

const nameRole = {
  name: Joi.string().min(2).max(50).required(),
};
const descriptionRole = {
  description: Joi.string().min(50).max(5000).required(),
};
const shortDescriptionRole = {
  shortDescription: Joi.string().min(10).max(255).required(),
};
const priceRole = {
  price: Joi.number().min(Number.MIN_VALUE).max(10000).required(),
};

 
const productSchema = {
    ...nameRole,
    ...descriptionRole,
    ...shortDescriptionRole,
    ...priceRole,
}

export default productSchema