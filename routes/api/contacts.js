const express = require("express");

const {
	createContact,
	getAllContacts,
	getById,
	deleteById,
	updateById,
	updateStatusContact,
} = require("../../controllers/contacts-controllers");

const isValidId = require("../../middleware/isValidId");
const validateBody = require("../../middleware/validateBody");
const validateFavorite = require("../../middleware/validateFavorite");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), createContact);

router.delete("/:contactId", isValidId, deleteById);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemas.addSchema),
	updateById
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateFavorite,
	validateBody(schemas.updateFavoriteSchema),
	updateStatusContact
);

module.exports = router;
