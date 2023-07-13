const { Contact } = require("../models/contacts");

const { ctrlWrapper, HttpError } = require("../utils");

const getAllContacts = async (req, res, next) => {
	const result = await Contact.find();
	res.json(result);
};

const getById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const createContact = async (req, res, next) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "contact deleted",
	});
};

const updateById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}

	res.json(result);
};
const updateStatusContact = async (req, res, next) => {
	const { contactId } = req.params;

	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}

	res.json(result);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getById: ctrlWrapper(getById),
	createContact: ctrlWrapper(createContact),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
