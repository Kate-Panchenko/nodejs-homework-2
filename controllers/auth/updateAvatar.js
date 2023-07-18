const path = require("path");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
	const { _id } = req.user;

	const { path: tempUpload, originalname } = req.file;

	const avatar = await Jimp.read(tempUpload);
	avatar.resize(250, 250).writeAsync(tempUpload);

	const filename = `${_id}_${originalname}`;

	if (!filename) {
		throw HttpError(400, "File is require!");
	}

	const resultUpload = path.join(avatarsDir, filename);

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", filename);

	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({
		avatarURL,
	});
};

module.exports = updateAvatar;
