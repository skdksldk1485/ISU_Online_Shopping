import React, { useState } from 'react';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    history.push(`/shop/search/${keyword}`);

  };

  return (
    <div className='search__form'>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          name='q'
          placeholder='상품 검색...'
          onChange={e => setKeyword(e.target.value)}
        />
        <button className='search__form__btn'>
          <strong>SEARCH</strong>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
