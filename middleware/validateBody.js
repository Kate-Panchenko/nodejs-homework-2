const { HttpError } = require("../utils");

const validateBody = (schema) => {
	const func = (req, __, next) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			throw HttpError(400, "missing fields");
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};
	return func;
};

module.exports = validateBody;
