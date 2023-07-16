const express = require("express");

const {
	createContact,
	getAllContacts,
	getById,
	deleteById,
	updateById,
	updateStatusContact,
} = require("../../controllers/contacts");

const isValidId = require("../../middleware/isValidId");
const validateBody = require("../../middleware/validateBody");
const validateFavorite = require("../../middleware/validateFavorite");
const { schemasContact } = require("../../models");
const { authenticate } = require("../../middleware");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemasContact.contactsAddSchema), createContact);

router.delete("/:contactId", isValidId, deleteById);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemasContact.contactsAddSchema),
	updateById
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateFavorite,
	validateBody(schemasContact.updateFavoriteSchema),
	updateStatusContact
);

module.exports = router;
