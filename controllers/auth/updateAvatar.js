const path = require("path");
const { User } = require("../../models");
const { HttpError, processAvatar } = require("../../utils");
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

	// const { filename } = req.file;
	// const { _id } = req.user;
	// const newFileName = `${_id}_${filename}`;

	// if (!filename) {
	// 	throw HttpError(400, "File is require!");
	// }

	// const tmpPath = path.resolve(__dirname, "../../", "tmp", filename);
	// const avatarsDir = path.resolve(
	// 	__dirname,
	// 	"../../",
	// 	"public",
	// 	"avatars",
	// 	newFileName
	// );

	// const image = await Jimp.read(tmpPath);
	// await image.resize(250, 250).quality(60).writeAsync(avatarsDir);

	// const avatarURL = path.join("avatars", newFileName);
	// await User.findByIdAndUpdate(_id, { avatarUrl: avatarURL });

	// await fs.unlink(tmpPath);

	// res.json({
	// 	avatarURL,
	// });
};

module.exports = updateAvatar;
