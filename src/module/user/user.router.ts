import {
  ADD_FRIEND_URL,
  REMOVE_FRIEND_URL,
  UPDATE_USER_URL,
  USER_SIGN_IN,
} from "../../helpers/urls";
import controller from "./user.controller";
import express from "express";
import {
  addFriendValidation,
  registerOrSignInValidation,
  removeFriendValidation,
  updateValidation,
} from "./user.middleware";

const router = express.Router();

router.route("/").post(registerOrSignInValidation, controller.createUser);

router
  .route(USER_SIGN_IN)
  .post(registerOrSignInValidation, controller.signInUser);

router.route(UPDATE_USER_URL).patch(updateValidation, controller.updateUser);

router.route(ADD_FRIEND_URL).patch(addFriendValidation, controller.addFriend);

router
  .route(REMOVE_FRIEND_URL)
  .patch(removeFriendValidation, controller.removeFriend);

export = router;
