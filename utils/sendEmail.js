const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
	service: "meta",
	host: "smtp.meta.com",
	port: 465,
	secure: false,
	auth: {
		user: "panchenko.kateryna@meta.ua",
		pass: META_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
	const email = { ...data, from: "panchenko.kateryna@meta.ua" };
	await transport.sendMail(email);
	return true;
};

module.exports = sendEmail;
