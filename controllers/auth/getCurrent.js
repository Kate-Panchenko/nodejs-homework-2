const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;

	if (!req.user) {
		throw HttpError(401, "Not authorized");
	}

	res.json({
		email,
		subscription,
	});
};

module.exports = getCurrent;
