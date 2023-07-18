const Jimp = require("jimp");

const processAvatar = async (imagePath) => {
	const avatar = await Jimp.read(imagePath);
	avatar
		.autocrop()
		.contain(
			250,
			250,
			Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
		);
	await avatar.writeAsync(imagePath);
};

module.exports = processAvatar;
