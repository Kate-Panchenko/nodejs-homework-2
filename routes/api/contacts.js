const express = require("express");

const contactsService = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contactsService.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.status(200).json({
		message: "Delete successful",
	});
});

router.put("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contactsService.updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
});

module.exports = router;
