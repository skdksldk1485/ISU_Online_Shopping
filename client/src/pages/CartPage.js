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
      <h3 className='cart__title'>SHOPPING CART ITEMS</h3>
      {cartItems.length === 0 ? (
        <div className='error'>
          <Message>
            Your cart is empty <Link to='/shop'>Click here to go back</Link>
          </Message>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.product} className='cart__container'>
              <img src={item.image} alt={item.name} />
              <div className='cart__name'>
                <Link to={`/shop/product/${item.product}`}>{item.name}</Link>
              </div>
              <div>${item.price}</div>
              <div>
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
              </div>
              <div>
                <button
                  className='btn'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
          <div className='cart__content'>
            <p>
              Order quantity:{' '}
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
            </p>
            <p>Delivery: FREE</p>
            <p className='cart__tot'>
              TOTAL: $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </p>
            <button
              className={`${cartItems.length === 0 ? 'disabled' : 'btn'}`}
              onClick={checkoutHandler}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
