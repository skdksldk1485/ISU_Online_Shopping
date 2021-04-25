import React from 'react';
import { Link } from 'react-router-dom';

const OrderProcess = ({ step1, step2, step3 }) => {
  return (
    <div className='form__order__nav'>
      <span className='form__order__nav__item'>
        {step1 ? (
          <Link to='/shipping'>1단계</Link>
        ) : (
          <a href='/shipping' className='form__order__nav__disabled'>
            1단계
          </a>
        )}
      </span>
      <span className='form__order__nav__item'>
        {step2 ? (
          <Link to='/payment'>2단계</Link>
        ) : (
          <a href='/payment' className='form__order__nav__disabled'>
            2단계
          </a>
        )}
      </span>
      <span className='form__order__nav__item'>
        {step3 ? (
          <Link to='/placeorder'>3단계</Link>
        ) : (
          <a href='/payment' className='form__order__nav__disabled'>
            3단계
          </a>
        )}
      </span>
    </div>
  );
};

export default OrderProcess;
