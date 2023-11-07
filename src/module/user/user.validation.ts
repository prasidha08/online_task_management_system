import Joi from "joi";

const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
}).or("name", "address", "phoneNumber");

const addFriendSchema = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().hex().required(),
}).required();

const userParamSchema = Joi.object({
  userId: Joi.string().hex().required(),
});

const removeFriendSchema = Joi.object({
  friendId: Joi.string().hex().required(),
});

export = {
  userRegisterValidation: {
    body: userRegistrationSchema,
  },

  userUpdateValidation: {
    body: userUpdateSchema,
    params: userParamSchema,
  },

  userAddFriendValidation: {
    body: addFriendSchema,
    params: userParamSchema,
  },

  userRemoveFriendValidation: {
    body: removeFriendSchema,
    params: userParamSchema,
  },
};
