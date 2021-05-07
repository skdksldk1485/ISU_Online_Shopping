import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <FormContainer>
      <Meta title='ISU | User Edit' />
      <h3 className='admin__list__title'>사용자 정보 수정</h3>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <div className='error'>
          <Message>{errorUpdate}</Message>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>
          <Message>{error}</Message>
        </div>
      ) : (

        <div className='common__form'>
          <form onSubmit={submitHandler}>
            <table>
              <tr>
                <td>이름</td>
                <td>
                  <input
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>
                  <input
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>관리자 권한</td>
                <td>
                  <input
                    type='checkbox'
                    checked={isAdmin}
                    className='form__content__checkbox'
                    onChange={e => setIsAdmin(e.target.checked)}
                  />
                </td>
              </tr>
            </table>
            <button className='btn'>수정하기</button>
          </form>
        </div>
      )}
    </FormContainer>
  );
};

export default UserEditPage;
