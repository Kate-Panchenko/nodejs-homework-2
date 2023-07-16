const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { HttpError } = require("../../utils");
const { User } = require("../../models");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const avatarUrl = gravatar.url(email);

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarUrl,
	});

	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
	});
};

module.exports = register;
