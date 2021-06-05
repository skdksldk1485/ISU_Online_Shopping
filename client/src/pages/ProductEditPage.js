import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

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
      updateProduct({
        _id: productId,
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
      <Meta title='ISU | Edit Product' />
      <h3 className='common__title'>상품 수정</h3>
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

            <button className='btn'>수정하기</button>
          </form>
        </div>
      )}
    </FormContainer>
  );
};

export default ProductEditPage;
