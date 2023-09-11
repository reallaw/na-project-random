const express = require("express");
const app = express();
const db = require("./routes/db-config");
const PORT = process.env.PORT || 3001;

// db.connect((err) => { // <-- db connect starts here -->
//     if (err) {
//         throw new Error(err);
//     } else {
//         console.log("DB ok");
//     };
// }); // <-- db connect ends here -->
app.use(express.json()); // <-- app.use starts here -->
app.use(express.urlencoded());
app.use("/blocks", express.static(__dirname + "/public/blocks"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/pages", express.static(__dirname + "/public/pages"));
app.use("/scripts", express.static(__dirname + "/public/scripts"));
app.use("/vendor", express.static(__dirname + "/public/vendor"));
app.use("/", require("./routes/pages"));
app.listen(PORT);
console.log('Successfully started at' + ' ' + PORT);