import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import OrderProcess from '../components/OrderProcess';
import { createOrder } from '../actions/orderActions';
import Meta from '../components/Meta';

const OrderPlacePage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);


  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = 0;
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

  }, [history, order, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className='container'>
      <Meta title='ISU | Place Order' />
      <OrderProcess step1 step2 step3 />
      <div className='order'>
        <div>
          <h3 className='order__title'>배송</h3>
          <p className='order__content'>
            <strong>주소: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}
          </p>

          <h3 className='order__title'>결재방법</h3>
          <p className='order__content'>
            <strong>결재방법: </strong>
            {cart.paymentMethod}
          </p>

          <div className='order__content'>
            <h3 className='order__title'>주문 상품</h3>
            {cart.cartItems.length === 0 ? (
              <div className='error'>
                <Message>장바구니가 비었습니다</Message>
              </div>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className='order__content__container'>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className='order__content__container__name'>
                      <Link to={`/product/${item.product}`}> {item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className='order__summary__title'>주문 요약</h3>
          <div className='common__list'>
          <table>
            <tr>
              <td>총 상품금액</td>
              <td>${cart.itemsPrice}
              </td>
            </tr>
            <tr>
              <td>배송비</td>
              <td>${cart.shippingPrice}
              </td>
            </tr>
            <tr>
              <td>세금</td>
              <td>${cart.taxPrice}
              </td>
            </tr>
            <tr>
              <td>총 결재금액</td>
              <td>${cart.totalPrice}
              </td>
            </tr>
          </table>
          </div>
          {error && (
            <div className='error'>
              <Message>(error)</Message>
            </div>
          )}
          <button
            className={`${cart.cartItems === 0 ? 'disabled' : 'btn'}`}
            onClick={placeOrderHandler}
          >
            결재하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacePage;
