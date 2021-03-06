import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='container'>
      <Meta title='ISU | Cart' />
      <h3 className='cart__title'>장바구니</h3>
      {cartItems.length === 0 ? (
        <div className='error'>
          <Message>
            Your cart is empty <Link to='/shop'>Click here to go back</Link>
          </Message>
        </div>
      ) : (
        <div className='cart__container'>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="40%" />
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr align="center" >
                <th>이미지</th>
                <th>상품정보</th>
                <th>판매가</th>
                <th>수량</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
          {cartItems.map(item => (
              <tr align="center" >
                <td>
                  <img className='cart__container__img' src={item.image} alt={item.name} /></td>
                <td>
                  <div className='cart__container__content'><Link to={`/shop/product/${item.product}`}>{item.name}</Link>
                  </div></td>
                <td>${item.price}</td>
                <td>
                <select
                  className='select'
                  value={item.qty}
                  onChange={e =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                </td>
                <td>
                <button
                  className='btn'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  REMOVE
                </button>
                </td>
              </tr>
          ))}
          </tbody>
          </table>

          <div className='cart__content'>
            <table>
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="60%" />
              </colgroup>
              <thead>
                <tr align="center" >
                  <th>총 상품금액</th>
                  <th>배송비</th>
                  <th>총 결재금액</th>
                </tr>
              </thead>
              <tbody>
                <tr align="center" >
                  <td>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</td>
                  <td>$0</td>
                  <td>=${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</td>
                </tr>
              </tbody>
            </table>
            <button
              className={`${cartItems.length === 0 ? 'disabled' : 'btn'}`}
              onClick={checkoutHandler}
            >
              주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
