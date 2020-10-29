import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/actions/postActions';

import { Button } from 'reactstrap';

// icons
import editIcon from '../img/edit-tool.png';
import deleteIcon from '../img/trash.png';
import addButtonIcon from '../img/add.png';

const Categories = ({ categories, fetchCategories }) => {
  let rowsData = [];
  let data;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (categories && categories.data.length > 0) {
    categories.data.forEach(categories => {
      rowsData.push({
        categories: <h6 className='tags-name d-inline text-white bg-success'>{categories.name}</h6>,
        categoriesSearch: categories.name,

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
          label: 'Categories',
          field: 'categories',
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
  categories: state.posts.categories,
});

export default connect(mapStateToProps, { fetchCategories })(Categories);
