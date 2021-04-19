import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Nav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

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
            <NavLink to='/shop/category/outers' activeClassName='active'>
              OUTERS
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/tops' activeClassName='active'>
              TOPS
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/pants' activeClassName='active'>
              PANTS
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/dresses' activeClassName='active'>
              DRESSES
            </NavLink>
          </li>
          <li className={'nav__list__item'}>
            <NavLink to='/shop/category/caps' activeClassName='active'>
              CAPS
            </NavLink>
          </li>
        </ul>
      </div>
      </nav>
    </header>
  );
};

export default Nav;
