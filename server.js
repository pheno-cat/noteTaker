const express = require("express");
const fs = require("fs");
const path = require("path");
let notes = require("./db/db.json");

const app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

console.log(notes);

//HTML ROUTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API ROUTES
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  let data = req.body;
  let randomID = Math.floor(Math.random() * 100000000);
  data["id"] = randomID;
  notes.push(data);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
    return res.json(data);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  let toBeDeleted = req.params.id;
  for (i = 0; i < notes.length; i++) {
    if (toBeDeleted == notes[i].id) {
      notes.splice(i, 1);
    }
  }
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
    return;
  });
  res.end();
});

//CATCH ALL ROUTE
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("I'm alive!");
});
