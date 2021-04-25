import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderProcess from '../components/OrderProcess';
import { savePaymentMethod } from '../actions/cartActions';
import Meta from '../components/Meta';

const OrderPayPage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div className='container'>
      <Meta title='ISU | Payment Info' />
      <OrderProcess step1 step2 />
      <h3 className='form__title'>결재방법 선택</h3>
      <form onSubmit={submitHandler}>
        <div className='form__checkout__content'>
          <input
            type='radio'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='PayPal'> PayPal or 신용카드</label>
        </div>

        <button className='btn form__btn'>계속하기</button>
      </form>
    </div>
  );
};

export default OrderPayPage;
