import {
  ADD_FRIEND_URL,
  REMOVE_FRIEND_URL,
  UPDATE_USER_URL,
  USER_SIGN_IN,
} from "../../helpers/urls";
import controller from "./user.controller";
import express from "express";

const router = express.Router();

router.route("/").post(controller.createUser);

router.route(USER_SIGN_IN).post(controller.signInUser);

router.route(UPDATE_USER_URL).patch(controller.updateUser);

router.route(ADD_FRIEND_URL).get(controller.addFriend);

router.route(REMOVE_FRIEND_URL).get(controller.addFriend);

export = router;
