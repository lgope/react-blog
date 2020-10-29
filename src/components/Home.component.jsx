import React, { useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import Post from './Post.component';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { fetchPosts, fetchTags } from '../redux/actions/postActions';
import PaginationBar from './PaginationBar.component';

const Home = ({ fetchPosts, posts }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <Button variant='outline-secondary'>Add New</Button>
        </div>
        {/* search and filter options */}
        <div className='col-lg-6 col-md-6 col-sm-12 float-right'>
          <form className='form-inline d-flex justify-content-center md-form form-sm mt-0'>
            <i className='fas fa-search' aria-hidden='true'></i>
            <input
              className='form-control form-control-sm ml-3 w-20 h-80'
              type='text'
              placeholder='Search'
              aria-label='Search'
            />
            <Button variant='outline-primary ml-2'>Search</Button>
            <Dropdown className='ml-2'>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                <i className='fa fa-filter' aria-hidden='true'></i> Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {['All', 'Recent', 'Author'].map(el => (
                  <Dropdown.Item
                    as='button'
                    key={el}
                    value={el === 'All' ? '' : el}
                  >
                    {el}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </form>
        </div>
      </div>
      <br />
      <br />

      <div className='row'>
        <div className='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>
          {posts &&
            posts.data.map(post => (
              <div key={post.id}>
                <Post post={post} />
              </div>
            ))}
        </div>
      </div>

      <br />
      <PaginationBar />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { login, fetchPosts, fetchTags })(Home);
