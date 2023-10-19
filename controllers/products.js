const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, featured, name, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = ( page - 1 ) * limit;

  // page = 2;
  // limit = 3;
  // skip = 1 * 3 = 3;
  
  apiData = apiData.skip(skip).limit(limit);

  // console.log(queryObject);

  const My_Products = await apiData;
  res.status(200).json({ My_Products });
};

const getAllProductsTesting = async (req, res) => {
  console.log(req.query);
  const My_Products = await Product.find(req.query);
  res.status(200).json({ My_Products, nbHits: My_Products.length });
};

module.exports = { getAllProducts, getAllProductsTesting };

// name -price => name,price