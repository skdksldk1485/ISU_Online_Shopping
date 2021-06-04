import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

  return (
    <>
      <nav className='side'>
        <div>
          <ul className='side__list'>
            <li className='side__list__item'>
              <NavLink exact to='/shop' activeClassName='active'>
                ALL
              </NavLink>
            </li>
            <li className='side__list__item'>
              <NavLink to='/shop/category/outers' activeClassName='active'>
                OUTERS
              </NavLink>
            </li>
            <li className='side__list__item'>
              <NavLink to='/shop/category/tops' activeClassName='active'>
                TOPS
              </NavLink>
            </li>
            <li className='side__list__item'>
              <NavLink to='/shop/category/pants' activeClassName='active'>
                PANTS
              </NavLink>
            </li>
            <li className='side__list__item'>
              <NavLink to='/shop/category/dresses' activeClassName='active'>
                DRESSES
              </NavLink>
            </li>
            <li className='side__list__item'>
              <NavLink to='/shop/category/caps' activeClassName='active'>
                CAPS
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
