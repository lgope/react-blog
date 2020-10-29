import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { clearErrors } from '../../redux/actions/errorActions';
import { resetPassword } from '../../redux/actions/authActions';
import loadingImage from '../../img/loading30.webp';
import { Link } from 'react-router-dom';

const ResetPassword = ({ auth, isLoading, resetPassword }) => {
  const [email, setEmail] = useState('');

  const handleChangeEmail = event => setEmail(event.target.value);

  const onFormSubmit = e => {
    e.preventDefault();
    resetPassword({ email: email });
    auth.messages = ''
  };

  return (
    <Fragment>
      <div className='login-page mt-5'>
        <div className='container'>
          <div className='row no-gutter'>
            <div className='col-md-2 col-lg-3'></div>
            <div className='col-md-8 col-lg-6'>
              <div className='login d-flex align-items-center py-5'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-12 col-lg-12 mx-auto'>
                      {isLoading && (
                        <center>
                          <img src={loadingImage} alt='loadingImage' />
                        </center>
                      )}
                      <br />
                      {auth.resetMessage ? (
                        <Alert color='warning'>{auth.resetMessage}</Alert>
                      ) : null}
                      <form>
                        <div className='form-label-group'>
                          <input
                            type='email'
                            id='inputEmail'
                            className='form-control'
                            placeholder='Email address'
                            required
                            autoFocus
                            value={email}
                            onChange={handleChangeEmail}
                          />
                        </div>

                        <div className='text-center'>
                          <button
                            className='btn btn-sm btn-primary  btn-login text-uppercase m-2'
                            type='submit'
                            onClick={onFormSubmit}
                          >
                            Reset Password
                          </button>
                          <Link
                            className='btn btn-sm btn-info btn-login text-uppercase m-2 tex-white'
                            to='/'
                          >
                            Login
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(
  ResetPassword
);
