import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className='container'>
      <Meta title='ISU | Users List' />
      <h3 className='common__list__title'>사용자 관리</h3>
      <div className='common__list'>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>
            <Message>{error}</Message>
          </div>
        ) : (
          <table className='common__list__table'>
            <thead>
              <tr>
                <th>순번</th>
                <th>이름</th>
                <th>이메일</th>
                <th>관리자</th>
                <th>수정 / 삭제</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>

                    <td className='admin__list__btn'>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className='btn common__list__edit'>
                          <FontAwesomeIcon
                            icon={faEdit}
                          />
                        </button>
                      </Link>
                      <button
                        className='btn'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
