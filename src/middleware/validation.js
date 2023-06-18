const Joi = require("joi");
exports.validationMiddleWare = (req, res, next) => {
  const userSchema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .trim(),
    calling_code: Joi.string().trim().required(),
    contact_number: Joi.number().integer().min(10).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: error.details[0].message });
  } else {
    next();
  }
};

exports.loginValidation = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: error });
  } else {
    next();
  }
};
exports.validationTenantMiddleWare = (req, res, next) => {
  const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    apartment_number: Joi.number().required(),
    apartment_type: Joi.string().required(),
    contact_number: Joi.string().min(10).required(),
    kin_name: Joi.string().required(),
    kin_address: Joi.string().required(),
    kin_contact_number: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: error });
  } else {
    next();
  }
};
