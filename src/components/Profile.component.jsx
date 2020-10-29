import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

const Profile = ({ user }) => (
  <div className='container mt-4'>
    <div className='card'>
      <div className='card-header'>
        <h3>Profile</h3>
      </div>
      <div className='card-body'>
        <Table hover>
          <thead>
            <tr>
              <th>Attributes</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {user ? (
              <>
                <tr>
                  <td>Name</td>
                  <td>{user[0].name}</td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{user[0].email}</td>
                </tr>

                <tr>
                  <td>First Log At</td>
                  <td>{user[0].created_at}</td>
                </tr>

                <tr>
                  <td>Role</td>
                  <td>{user[0].is_admin ? 'Admin' : 'User'}</td>
                </tr>
              </>
            ) : (
              'Loading...'
            )}
          </tbody>
        </Table>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
