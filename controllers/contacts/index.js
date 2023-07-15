const { ctrlWrapper } = require("../../utils");

const createContact = require("./createContact");
const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
	createContact: ctrlWrapper(createContact),
	getById: ctrlWrapper(getById),
	getAllContacts: ctrlWrapper(getAllContacts),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
