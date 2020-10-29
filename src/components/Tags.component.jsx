import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import { fetchTags } from '../redux/actions/postActions';

import { Button } from 'reactstrap';

// icons
import editIcon from '../img/edit-tool.png';
import deleteIcon from '../img/trash.png';
import addButtonIcon from '../img/add.png';

const Tags = ({ tags, fetchTags }) => {
  let rowsData = [];
  let data;

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  if (tags && tags.data.length > 0) {
    tags.data.forEach(tag => {
      rowsData.push({
        tags: <h6 className='tags-name d-inline text-info'>{tag.name}</h6>,
        tagsSearch: tag.name,

        actions: (
          <center>
            <button
              className='btn btn-link text-danger'
              title='Edit'
            >
              <img className='hvr-grow' src={editIcon} alt='edit' />
            </button>
            <button
              className='btn btn-link text-danger hvr-grow'
              title='Delete'
            >
              <img src={deleteIcon} alt='edit' />
            </button>
          </center>
        ),
      });
    });

    data = {
      columns: [
        {
          label: 'Tags',
          field: 'tags',
          sort: true,
        },
        {
          label: <center>Actions</center>,
          field: 'actions',
          sort: true,
        },
      ],
      rows: rowsData,
    };
  }

  return (
    <div className='container mt-4'>
      <MDBDataTable striped bordered fixed data={data} />
      <br />
      <Button color='white' size='sm' title='Add New' className='mr-2'>
        <img className='hvr-grow' src={addButtonIcon} alt='Icon' title='Add New'/>
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  // auth: state.auth,
  // isLoading: state.auth.isLoading,
  // error: state.error,
  tags: state.posts.tags,
});

export default connect(mapStateToProps, { fetchTags })(Tags);
