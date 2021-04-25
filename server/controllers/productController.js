import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description    Fetch all products
// @route          GET /api/products
const getProductList = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  const keywordFilter = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {};

  const categoryFilter = req.query.category
    ? {
        category: req.query.category
      }
    : {};

  const count = await Product.countDocuments({
    ...keywordFilter,
    ...categoryFilter
  });
  const products = await Product.find({ ...keywordFilter, ...categoryFilter })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @description    Fetch single product
// @route          GET /api/products/.id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description    Delete a product
// @route          DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description    Create a product
// @route          POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock,
    numReviews: 0,
    description
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description    Update a product
// @route          PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description    Create new review
// @route          POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('리뷰가 이미 등록되었습니다');
    }

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    await product.save();
    res.status(201).json({ message: '리뷰가 추가됨' });
  } else {
    res.status(404);
    throw new Error('상품이 존재하지 않습니다');
  }
});

export {
  getProductList,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
};
