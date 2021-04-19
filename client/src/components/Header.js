import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import {
  faSearch,
  faCartPlus,
  faStore,
  faUser,
  faEdit,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const [navToggleOpen, setNavToggleOpen] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className={location.pathname === '/' ? 'nav nav--dark' : 'nav'}>
        <div className='nav__logo'>
          <Link to='/'>ISU</Link>
        </div>

        <button
          className='nav__toggle-btn'
          onClick={() => setNavToggleOpen(!navToggleOpen)}
        >
          {navToggleOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>

        <ul
          className={`${
            navToggleOpen ? 'nav__items nav__items-open' : 'nav__items'
          }`}
        >
          <li>
            <Link to='/shop/search'>
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </li>
          <li>
            <Link to='/shop'>
              <FontAwesomeIcon icon={faStore} />
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <FontAwesomeIcon icon={faCartPlus} />
            </Link>
          </li>
          {userInfo ? (
            <li className='dropdown'>
              <div className='dropdown__profile'>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ margin: '0 4px' }}
                />
                ({userInfo.name})
              </div>
              <div className='dropdown__content'>
                <div className='dropdown__content__item'>
                  <Link to='/profile'>프로필</Link>
                </div>
                <div
                  onClick={logoutHandler}
                  className='dropdown__content__item'
                >
                로그아웃
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link to='/login'>SIGN IN</Link>
            </li>
          )}

          {userInfo && userInfo.isAdmin && (
            <li className='dropdown'>
              <div className='dropdown__profile'>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ margin: '0 4px' }}
                />
                (관리자)
              </div>
              <div className='dropdown__content'>
                <div className='dropdown__content__item'>
                  <Link to='/admin/userlist'>사용자</Link>
                </div>
                <div className='dropdown__content__item'>
                  <Link to='/admin/productlist'>상품</Link>
                </div>
                <div className='dropdown__content__item'>
                  <Link to='/admin/orderlist'>주문</Link>
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
