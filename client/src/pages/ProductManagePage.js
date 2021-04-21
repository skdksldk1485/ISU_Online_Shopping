import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { listProducts, deleteProduct } from '../actions/productActions';
import Meta from '../components/Meta';
import {
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductManagePage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(listProducts('', '', pageNumber));
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className='container'>
      <Meta title='ISU | Products List' />
      <h3 className='common__list__title'>상품관리</h3>

      <Link to='/admin/product/create' className='btn'>
        상품 추가
      </Link>

      <div className='common__list'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='error'>{errorDelete}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <table className='common__list__table'>
            <thead>
              <tr>
                <th>순번</th>
                <th>이름</th>
                <th>가격</th>
                <th>카테고리</th>
                <th>브랜드</th>
                <th>수정 / 삭제</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td className='common__list__btn'>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className='btn common__list__edit'>
                          <FontAwesomeIcon
                            icon={faEdit}
                          />
                        </button>
                      </Link>
                      <button
                        className='btn'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <Pagination pages={pages} page={page} isAdmin={true} />
      </div>
    </div>
  );
};

export default ProductManagePage;
