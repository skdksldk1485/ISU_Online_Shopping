import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import Meta from '../components/Meta';

const OrderCheckPage = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/congig/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, userInfo, history]);

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <div className='loading'>
      <Loader />
    </div>
  ) : error ? (
    <div className='error'>
      <Message>(error)</Message>
    </div>
  ) : (
    <div className='container'>
      <Meta title='ISU | Order Summary' />
      <h3>Order {order._id}</h3>
      <div className='order'>
        <div>
          <h3 className='order__title'>배송</h3>
          <p className='order__content'>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.postalCode}, {order.shippingAddress.city}
          </p>

          <h3 className='order__title'>결재방법</h3>
          <p className='order__content'>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>

          <div className='order__content'>
            <h3 className='order__title'>주문 상품</h3>
            {order.orderItems.length === 0 ? (
              <div className='error'>
                <Message>장바구니가 비었습니다</Message>
              </div>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} className='order__content__container'>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className='order__content__container__name'>
                      <Link to={`/product/${item.product}`}> {item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x {item.price}원 = {item.qty * item.price}원
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
              <td>{order.itemsPrice}원
              </td>
            </tr>
            <tr>
              <td>배송비</td>
              <td>{order.shippingPrice}원
              </td>
            </tr>
            <tr>
              <td>세금</td>
              <td>{order.taxPrice}원
              </td>
            </tr>
            <tr>
              <td>총 결재금액</td>
              <td>{order.totalPrice}원
              </td>
            </tr>
          </table>
          </div>
          {error && (
            <div className='error'>
              <Message>(error)</Message>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCheckPage;
