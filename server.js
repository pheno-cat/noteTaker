const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function () {
  console.log("I'm alive!");
});
