import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const SearchPage = ({ match }) => {
  const category = match.params.category;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <>
      <Meta title='Search | ISU' />
      <div className='container'>
      <Route render={({ history }) => <SearchBox history={history} />} />

      {!keyword? (
        <div></div>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      ) : (
        <div>
          <div className='productList__title'>
            검색어 : {keyword}
          </div>
          <div className='products'>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default SearchPage;
