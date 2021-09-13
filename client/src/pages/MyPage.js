import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import Meta from '../components/Meta';

const MyPage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setErrorMessage('');
      setSuccessMessage('Profile updated successfully!');
    }
  };

  return (
    <div className='container form'>
      <Meta title={`ISU | ${user.name}'s Profile`} />
      <h2>프로필</h2>
      {errorMessage && !success ? (
        <div className='error'>
          <Message>{errorMessage}</Message>
        </div>
      ) : (
        <div className='success' style={{ color: 'green' }}>
          <Message>{successMessage}</Message>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <div className='common__form'>
          <form onSubmit={submitHandler}>
            <table>
              <caption>기본정보</caption>
              <tr>
                <td>이름</td>
                <td>
                  <input
                    type="name"
                    value={name}
                    onChange={e => setName(e.target.value)} /><br />
                </td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)} /><br />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    type="password"
                    placeholder='비밀번호 입력..'
                    value={password}
                    onChange={e => setPassword(e.target.value)} /><br />
                </td>
              </tr>
              <tr>
                <td>비밀번호 확인</td>
                <td>
                  <input
                    type="password"
                    placeholder='비밀번호 입력..'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} /><br />
                </td>
              </tr>
            </table>

            <button className='btn'>수정하기</button>
          </form>
        </div>
      )}

      <div >
        <div className='common__list'>
          {loadingOrders ? (
            <div className='loading'>
              <Loader />
            </div>
          ) : errorOrders ? (
            <div className='error'>
              <Message>{error}</Message>
            </div>
          ) : (
            <table className='common__list__table'>
              <caption>주문목록</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>check</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <i className='fas fa-arrow-right'></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
