const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Welcome to 5th backend...");
  res.json("Hello world !!!!");
});

const routeContact = require("./routes/contact");

app.use(routeContact);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server 5th started...");
});
