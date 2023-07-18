const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../utils");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarUrl = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarUrl,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
	});
};

module.exports = register;
