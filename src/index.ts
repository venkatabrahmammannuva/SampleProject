import app from "./app";
import config from "./config/constant";

const port = config.app.PORT;
app.listen(port, function () {
	return console.log(`Server is running on ${port}`);
});

process.on("uncaughtException", (error) => {
	console.log("uncauthException occured");
	console.log(error);
});