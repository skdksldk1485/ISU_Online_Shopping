import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('리뷰가 등록되었습니다!');
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        comment
      })
    );
  };

  return (
    <>
      <Meta title='ISU | ProductDetail' />
      <div className='container'>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <>
            <div className='productDeatil'>
              <div className='productDetail__box'>
                <img src={product.image} alt={product.name} />
              </div>
              <div className='productDeatil__description'>
                <hr></hr>
                <div className='name'>{product.name}</div>
                <div className='description'>
                  {product.description}
                </div>
                <hr></hr>
                <div className='price'>
                  <div className='col'>가격</div>
                  <div>{product.price} </div>
                </div>
                {product.countInStock > 0 && (
                  <div className='quantity'>
                    <div className='col'>수량</div>
                    <select
                      className='select'
                      value={qty}
                      onChange={e => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map(
                        (x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
                <button
                  className={`${
                    product.countInStock === 0 ? 'disabled' : 'productDeatil__description__btn'
                  }`}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </button>

                <div className='productDetail__review'>
                  <h3>리뷰</h3>
                  {product.reviews.length === 0 && (
                    <div className='error'>
                      <Message>게시글이 없습니다</Message>
                    </div>
                  )}
                  <div>
                    {product.reviews.map((review, index) => (
                      <div className='productDetail__review__content'>
                        <div>
                          <strong>{review.name}</strong>
                        </div>
                        <div>
                          {review.comment}
                        </div>
                        <div>
                          {review.createdAt.substring(0, 10)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='productDetail__review__create'>
                    <h3>리뷰를 작성해주세요</h3>
                    {errorProductReview && (
                      <div className='error'>
                        <Message>{errorProductReview}</Message>
                      </div>
                    )}
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className='form__content__comment'>
                          <div>Comment</div>
                          <textarea
                            onChange={e => setComment(e.target.value)}
                          ></textarea>
                        </div>

                        <button className='btn'>제출하기</button>
                      </form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>Sign In</Link> to write a review
                      </Message>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
