import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductAddPage = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('outers');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/admin/productlist');
    }
  }, [dispatch, history, successCreate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <FormContainer>
      <Meta title='Create Product' />
      <h3>상품 추가</h3>
      {loadingCreate && <Loader />}
      {errorCreate && (
        <div className='error'>
          <Message>{errorCreate}</Message>
        </div>
      )}
      <div className='common__form'>
        <form onSubmit={submitHandler}>
          <table>
            <tr>
              <td>상품명</td>
              <td>
                <input
                  type="name"
                  placeholder='상품명 입력..'
                  value={name}
                  onChange={e => setName(e.target.value)} /><br />
              </td>
            </tr>
            <tr>
              <td>가격</td>
              <td>
                <input
                  type='number'
                  placeholder='가격 입력..'
                  value={price}
                  onChange={e => setPrice(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>이미지</td>
              <td>
                <input
                  type='text'
                  placeholder='이미지 선택..'
                  value={image}
                  onChange={e => setImage(e.target.value)} />
                <br />
                <input
                  type='file'
                  onChange={uploadFileHandler} />
                  {uploading && <Loader />}
              </td>
            </tr>
            <tr>
              <td>브랜드</td>
              <td>
                <input
                  type='text'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>재고수</td>
              <td>
                <input
                  type='number'
                  placeholder='재고수 입력..'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>종류</td>
              <td>
                  <select id="selbox" name="selbox" onChange={e => setCategory(e.target.value)}>
                  	<option value="outers" selected>OUTERS</option>
                    <option value="tops">TOPS</option>
                    <option value="pants">PANTS</option>
                    <option value="dresses">DRESSES</option>
                  	<option value="caps">CAPS</option>
                  </select>
              </td>
            </tr>
            <tr>
              <td>요약</td>
              <td>
                <input
                  type='text'
                  value={description}
                  onChange={e => setDescription(e.target.value)}/>
                  <br />
              </td>
            </tr>
          </table>

          <button className='btn'>상품 추가</button>
        </form>
      </div>
    </FormContainer>
  );
};

export default ProductAddPage;
