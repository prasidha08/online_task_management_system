import Joi from "joi";

const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
}).required();

const userParamSchema = Joi.object({
  userId: Joi.string().hex(),
});

export = {
  userRegisterValidation: {
    body: userRegistrationSchema,
  },

  userUpdateValidation: {
    body: userUpdateSchema,
    params: userParamSchema,
  },
};
