const mongoose = require("mongoose");

const app = require("./app");

//zQt7t6wdIVS0sVew

const DB_HOST =
	"mongodb+srv://03-mongodb:zQt7t6wdIVS0sVew@cluster0.1uraokm.mongodb.net/db-contacts?retryWrites=true&w=majority";

// mongoose.connect(process.env.DB_HOST, {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// });

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000), console.log("Database connection successful");
	})
	.catch((err) => {
		console.log(err.message);
		process.exit(1);
	});
