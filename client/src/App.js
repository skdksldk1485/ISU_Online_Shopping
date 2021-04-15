import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductManagePage from './pages/ProductManagePage';
import ProductAddPage from './pages/ProductAddPage';
import ProductDetail from './pages/ProductDetail';
import ProductEditPage from './pages/ProductEditPage';
import SearchPage from './pages/SearchPage';
import UserListPage from './pages/UserListPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderPayPage from './pages/OrderPayPage';
import OrderPlacePage from './pages/OrderPlacePage';
import OrderCheckPage from './pages/OrderCheckPage';
import OrderListPage from './pages/OrderListPage';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <Nav />
        <main>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/profile' component={MyPage} />
          <Route exact path='/admin/userlist' component={UserListPage} />
          <Route exact path='/shop' component={ProductsPage} />
          <Route
            exact
            path='/shop/page/:pageNumber'
            component={ProductsPage}
          />
          <Route
            exact
            path='/admin/productlist'
            component={ProductManagePage}
          />
          <Route
            exact
            path='/admin/productlist/:pageNumber'
            component={ProductManagePage}
          />
          <Route
            exact
            path='/admin/product/create'
            component={ProductAddPage}
          />
          <Route
            exact
            path='/admin/product/:id/edit'
            component={ProductEditPage}
          />
          <Route
            exact
            path='/shop/category/:category'
            component={ProductsPage}
          />
          <Route exact path='/shop/product/:id' component={ProductDetail} />
          <Route exact path='/shop/search' component={SearchPage} />
          <Route
            exact
            path='/shop/search/:keyword'
            component={SearchPage}
          />
          <Route
            exact
            path='/shop/search/:keyword/page/:pageNumber'
            component={SearchPage}
          />
          <Route exact path='/cart/:id?' component={CartPage} />
          <Route exact path='/shipping' component={OrderPage} />
          <Route exact path='/payment' component={OrderPayPage} />
          <Route exact path='/placeorder' component={OrderPlacePage} />
          <Route exact path='/order/:id' component={OrderCheckPage} />
          <Route exact path='/admin/orderlist' component={OrderListPage} />
        </main>

      </Router>
    </div>
  );
}

export default App;
