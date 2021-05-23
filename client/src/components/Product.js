import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {

  const price = product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Link className='product' to={`/shop/product/${product._id}`}>
      <img src={product.image} alt='product_image' />
      <div>{product.name}</div>
      <div>${price}</div>
    </Link>
  );
};

export default Product;
