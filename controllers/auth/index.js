const { ctrlWrapper } = require("../../utils");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const login = require("./login");
const register = require("./register");
const updateSubscription = require("./updateSubscription");

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updateSubscription: ctrlWrapper(updateSubscription),
};
