import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import {
  faSearch,
  faCartPlus,
  faStore,
  faCaretDown,
  faUser,
  faEdit,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {
  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className={location.pathname === '/' ? 'nav nav--dark' : 'nav'}>
      <div>
        <ul className='nav__list'>
          <li className={'nav__list__item'}>
            <NavLink exact to='/shop' activeClassName='active'>
              ALL
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/coats' activeClassName='active'>
              COATS & JACKETS
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/tops' activeClassName='active'>
              TOPS
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/dresses' activeClassName='active'>
              DRESSES
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/bottoms' activeClassName='active'>
              BOTTOMS
            </NavLink>
          </li>
        </ul>
      </div>
      </nav>
    </header>
  );
};

export default Nav;
