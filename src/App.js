import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import store from './redux/store';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// protected route
import ProtectedRoute from './routes/ProtectedRoute';

// loading user for check is logged or not
import { loadUser } from './redux/actions/authActions';

// components
import LoginForm from './components/auth/LoginForm.component';
import Navbar from './components/Navbar.component';
import Home from './components/Home.component';
import Tags from './components/Tags.component';
import PostDetails from './components/PostDetails.component';
import Profile from './components/Profile.component';
import Categories from './components/Categories.component';
import AppFooter from './components/AppFooter.component';
import NotFound from './components/NotFound.component';
import ResetPassword from './components/auth/ResetPassword.component'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <div className='content'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/reset-password' component={ResetPassword} />

          {/* Protected Routes */}
          {/* <Route exact path='/home' component={Home} /> */}
          <ProtectedRoute exact path='/home' component={Home} />

          <ProtectedRoute exact path='/tags' component={Tags} />

          <ProtectedRoute
            exact
            path='/post-details/:id'
            component={PostDetails}
          />

          <ProtectedRoute exact path='/profile' component={Profile} />

          <ProtectedRoute exact path='/categories' component={Categories} />

          <ProtectedRoute exact path='/categories' component={Categories} />

          {/* other page */}
          <Route path='*' component={NotFound} />

        </Switch>
      </div>
      <AppFooter />
    </Fragment>
  );
};

export default App;
