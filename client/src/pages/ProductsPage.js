import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Pagination from '../components/Pagination';
import { listProducts } from '../actions/productActions';

const ProductsPage = ({ match }) => {
  const category = match.params.category;

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <>
      <Meta title='ISU | Shop' />
      <div className='container'>

        <div className='productList__title'>
          <div className='productList__title__box'>
            {!category ? 'ALL' : category.toUpperCase()}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <div className='products'>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
        <Pagination
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
          category={category ? category : ''}
        />
      </div>
    </>
  );
};

export default ProductsPage;
