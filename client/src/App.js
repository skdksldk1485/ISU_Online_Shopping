import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Route exact path='/' component={HomePage} />
        </main>

      </Router>
    </div>
  );
}

export default App;
