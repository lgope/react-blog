import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => (
  <>
    <div className='post-preview'>
      <Link to={`/post-details/${post.id}`}>
        <h4 className='post-title'>{post.title}</h4>
      </Link>

      <p className='post-subtitle'>
        {post.body.length > 25 ? post.body.substr(0, 25) + '...' : post.body}
      </p>
      <p className='post-meta'>
        Posted on{' '}
        <span className='badge badge-pill badge-info mr-1'>
          {post.created_at}
        </span>
      </p>
    </div>
    <hr />
  </>
);

export default Post;
