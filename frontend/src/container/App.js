import React from 'react';
import './App.css';
import UserSignupPage from '../pages/UserSignupPage';
import UserLoginPage from '../pages/UserLoginPage';
import LanguageSelector from '../components/LanguageSelector'
import ApiProgress from '../shared/ApiProgress'
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
//import { Authentication } from '../shared/AuthenticationContext';
import { useSelector } from 'react-redux';

const App = () => {

  //static contextType = Authentication

  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn
  }))

    return (
      <div>
        <Router>
          <TopBar/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login" 
                component={UserLoginPage} 
              />
            )}
            <Route path="/signup" component={UserSignupPage} />
            <Route 
              path="/user/:username" 
              component={UserPage} 
            />
            <Redirect to="/" />
          </Switch>
        </Router>
      <LanguageSelector/>
    </div>
    );
}

export default App;