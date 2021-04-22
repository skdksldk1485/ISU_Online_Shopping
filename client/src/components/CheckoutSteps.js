import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <div className='form__checkout__nav'>
      <span className='form__checkout__nav__item'>
        {step1 ? (
          <Link to='/shipping'>1단계</Link>
        ) : (
          <a href='/shipping' className='form__checkout__nav__disabled'>
            1단계
          </a>
        )}
      </span>
      <span className='form__checkout__nav__item'>
        {step2 ? (
          <Link to='/payment'>2단계</Link>
        ) : (
          <a href='/payment' className='form__checkout__nav__disabled'>
            2단계
          </a>
        )}
      </span>
      <span className='form__checkout__nav__item'>
        {step3 ? (
          <Link to='/placeorder'>3단계</Link>
        ) : (
          <a href='/payment' className='form__checkout__nav__disabled'>
            3단계
          </a>
        )}
      </span>
    </div>
  );
};

export default CheckoutSteps;
