import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link className='product' to={`/shop/product/${product._id}`}>
      <img src={product.image} alt='product_image' />
      <div>{product.name}</div>
      ${product.price}
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
    </Link>
  );
};

export default Product;
