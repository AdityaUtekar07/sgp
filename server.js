const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const app = express();
const publicDirectory = path.join(__dirname, "./public");
const fs = require("fs");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;

app.use(express.static(publicDirectory));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readFile("items.json", function (err, data) {
    if (err) {
      res.status(500).end();
    } else {
      res.render("index", {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data),
      });
    }
  });
});
app.get("/about", (req, res) => {
  res.render("aboutUs");
});

app.listen(5000, () => {
  console.log("Server is running on port 5k");
});
