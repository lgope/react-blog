import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';

import { getPostDetails } from '../redux/actions/postActions';

const PostDetails = ({ getPostDetails, post }) => {
  const { id } = useParams();

  useEffect(() => {
    getPostDetails(id);
  }, [getPostDetails, id]);

  return (
    <div className='container mt-4'>
      {post && post.data ? (
        <div className='card'>
          <div className='card-header'>{post.data.title}</div>
          <div className='card-body'>
            <p className='card-text d-inline-block'>
              <strong>Description : </strong> {post.data.body}
            </p>

            <h5 className='text-info'>More Information:</h5>

            <p>
              <strong>Author : </strong>
              <span className='badge badge-pill badge-success mr-1'>
                {post.data.user.name}
              </span>
            </p>

            <p>
              <strong>Published : </strong>{' '}
              {post.data.is_published ? 'Yes' : 'No'}
            </p>

            <p>
              <strong>Published At : </strong>
              <span className='badge badge-pill badge-secondary mr-1'>
                {post.data.created_at}
              </span>
            </p>

            <p>
              <strong>Category :</strong> {post.data.category.name}
            </p>

            <p>
              <strong>Tags : </strong>
              {post.data.tags.map(tag => (
                <span key={tag.id} className='badge badge-pill badge-primary mr-1'>
                  {tag.name + ', '}
                </span>
              ))}
            </p>

            {/* badge */}
            <p>
              <strong>Last Update :</strong>{' '}
              <span className='badge badge-pill badge-info mr-1'>
                {post.data.updated_at}
              </span>
            </p>
            <br />
          </div>
        </div>
      ) : (
        'Loading....'
      )}

      <div className='acion-buttons mt-4'>
        <Link to='/home' className='btn btn-primary mr-2'>Go Back</Link>

        <Button color='success' className='mr-2'>
          Add
        </Button>

        <Button color='info' className='mr-2'>
          Edit
        </Button>

        <Button color='danger'>Delete</Button>
      </div>
      {/* comment form */}
      <form className='form-inline d-flex justify-content-center md-form form-sm mt-4'>
        <FormGroup>
          <textarea
            className='form-control form-control-sm ml-30'
            type='text'
            placeholder='Comment'
            aria-label='Comment'
            rows='2'
            cols='60'
          />
          <Button color='success' className='ml-2'>
            Comment <i className='fas fa-paper-plane'></i>
          </Button>
        </FormGroup>
      </form>

      <div className='comment-lists'>
        {post && post.data.comments.length > 0 ? (
          <div className='card'>
            <div className='card-body'>
              {post.data.comments.map(el => el.name)}
            </div>
          </div>
        ) : (
          <div className='card d-flex justify-content-center mt-2'>
            <div className='card-body'>No one has commented yet!</div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.posts.post,
});

export default connect(mapStateToProps, { getPostDetails })(PostDetails);
