// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Reviews from './Reviews';
import LogIn from './LogIn';
import Home from './Home';
import Register from './Register';
import SearchForm from './SearchForm';
import ContactInfo from './ContactInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/property" component={SearchForm} />
          <Route path="/contact" component={ContactInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
