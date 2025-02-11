const { HttpError, sendEmail } = require("../../utils");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(401, "Email not found");
	if (user.verify) throw HttpError(404, "Verification has already been passed");

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
