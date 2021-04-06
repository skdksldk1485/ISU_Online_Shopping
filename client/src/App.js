import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductManagePage from './pages/ProductManagePage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetail from './pages/ProductDetail';
import ProductEditPage from './pages/ProductEditPage';
import SearchPage from './pages/SearchPage';
import UserListPage from './pages/UserListPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <main>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
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
            component={ProductCreatePage}
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
            component={ProductsPage}
          />
          <Route
            exact
            path='/shop/search/:keyword/page/:pageNumber'
            component={ProductsPage}
          />
          <Route exact path='/cart/:id?' component={CartPage} />
        </main>

      </Router>
    </div>
  );
}

export default App;
