import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Meta from '../components/Meta';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/shop';

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <Meta title='ISU | Log In' />
      <h1 className='common__title'>ISU</h1>
      {error && (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      )}
      {loading && <Loader />}
      <div className='common__form'>
        <form onSubmit={submitHandler}>
          <table>
            <tr>
              <td>EMAIL</td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>PASSWORD</td>
              <td>
                <input
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </td>
            </tr>
          </table>
          <button className='btn'>로그인</button>
        </form>
      </div>
      <div className='common__form__join'>
        계정이 없으십니까?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          회원가입
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginPage;
