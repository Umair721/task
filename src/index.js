require('dotenv').config();
require("./db/conn");
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./routes");
app.use("/api", route);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
