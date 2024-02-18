const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;


app.use(express.json());
const routes = require('./routes')

app.use('/',routes)

app.listen(port, () => {
  console.log("Listening at port ", port);
});
