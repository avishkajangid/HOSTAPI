require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

const products_routes = require("./routes/products");

// Sample data
const data = [
  { id: 1, name: "Ram" },
  { id: 2, name: "Shyam" },
  { id: 3, name: "Shiv" },
];

// Endpoint to get data
app.get("/getData", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("<h1>Hey!!</h1><p>go to /api/products to fetch api</p>");
});

//middleware or to set router 
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`${port} Yes I'm connected!`);
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();