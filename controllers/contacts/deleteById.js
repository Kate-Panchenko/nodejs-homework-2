const { Contact } = require("../../models/contacts");

const { HttpError } = require("../../utils");

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

module.exports = deleteById;
