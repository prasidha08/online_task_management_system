import Joi from "joi";

const UserListsSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
});

const addCategorySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  userLists: Joi.alternatives().try(Joi.object().allow(null), UserListsSchema),
});

const categoryIdSchema = Joi.object({
  categoryId: Joi.string().hex().length(24).required(),
});

const userIdSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

export = {
  addCategoryValidation: {
    body: addCategorySchema,
    params: userIdSchema,
  },

  deleteCategoryValidation: {
    params: categoryIdSchema,
  },
};
