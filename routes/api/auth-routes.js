const express = require("express");

const authController = require("../../controllers/auth");

const { schemasUser } = require("../../models");
const { validateBody } = require("../../middleware");

const { authenticate } = require("../../middleware");

const router = express.Router();

router.post(
	"/register",
	validateBody(schemasUser.userRegisterSchema),
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

module.exports = router;
