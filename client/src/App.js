import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Route exact path='/' component={HomePage} />
        </main>

      </Router>
    </div>
  );
}

export default App;
