import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Meta from '../components/Meta';

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // If user is already logged in, redirect to login page
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <Meta title='ISU | Sign Up' />
      <h1 className='common__title'>ISU</h1>
      {message && (
        <div className='error'>
          <Message>{message}</Message>
        </div>
      )}
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
            <td>이름</td>
            <td>
              <input
                type="name"
                placeholder='이름을 입력하세요'
                value={name}
                onChange={e => setName(e.target.value)} />
            </td>
          </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input
                  type="email"
                  placeholder='이메일을 입력하세요'
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  type='password'
                  placeholder='비밀번호를 입력하세요'
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input
                  type='password'
                  placeholder='비밀번호를 확인하세요'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} />
              </td>
            </tr>
          </table>
          <button className='btn'>회원가입</button>
        </form>
      </div>

      <div className='common__form__join'>
        계정이 있으십니까?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          로그인
        </Link>
      </div>
    </FormContainer>
  );
};

export default RegisterPage;
