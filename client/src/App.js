import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
        </main>

      </Router>
    </div>
  );
}

export default App;
