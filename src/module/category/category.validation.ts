import Joi, { alternatives, string } from "joi";

const UserListsSchema = Joi.object({
  _id: string().hex().length(24).required(),
  name: string().required(),
});

const addCategorySchema = Joi.object({
  title: string().required(),
  userLists: alternatives().try(Joi.object().allow(null), UserListsSchema),
});

const categoryIdSchema = Joi.object({
  categoryId: string().hex().length(24).required(),
});

export = {
  addCategoryValidation: {
    body: addCategorySchema,
  },

  deleteCategoryValidation: {
    params: categoryIdSchema,
  },
};
