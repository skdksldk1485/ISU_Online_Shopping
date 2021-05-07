import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import OrderProcess from '../components/OrderProcess';
import { saveShippingAddress } from '../actions/cartActions';
import Meta from '../components/Meta';

const OrderPage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <Meta title='ISU | Shipping Info' />
      <OrderProcess step1 />
      <div className='common__title'>배송</div>
      <div className='common__form'>
        <form onSubmit={submitHandler}>
          <table>
            <tr>
              <td>주소</td>
              <td>
                <input
                  type='text'
                  placeholder='Enter address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>도시</td>
              <td>
                <input
                  type='text'
                  placeholder='Enter city'
                  value={city}
                  onChange={e => setCity(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>우편번호</td>
              <td>
                <input
                  type='text'
                  placeholder='Enter postal code'
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>국가</td>
              <td>
                <input
                  type='text'
                  placeholder='Enter country'
                  value={country}
                  onChange={e => setCountry(e.target.value)}/>
              </td>
            </tr>
          </table>

          <button className='btn'>계속하기</button>
        </form>
      </div>

    </FormContainer>
  );
};

export default OrderPage;
