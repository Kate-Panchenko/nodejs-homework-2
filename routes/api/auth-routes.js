const express = require("express");

const authController = require("../../controllers/auth");

const { schemasUser } = require("../../models");

const { validateBody, authenticate, upload } = require("../../middleware");

const router = express.Router();

router.post(
	"/register",
	validateBody(schemasUser.userRegisterSchema),
	upload.single("avatar"),
	authController.register
);

router.post(
	"/login",
	validateBody(schemasUser.userLoginSchema),
	authController.login
);
router.post("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.getCurrent);
router.patch(
	"/:id/subscription",
	authenticate,
	authController.updateSubscription
);

router.patch(
	"./avatars",
	authenticate,
	upload.single("avatar"),
	authController.updateAvatar
);

module.exports = router;
