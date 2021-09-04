const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const db = require("./app/models");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// prod mode
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Auth app..." });
});

require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
