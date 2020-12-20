import React from 'react';
import './modal.styles.css';

// redux stuff
import { connect } from 'react-redux';
import { filterImage } from '../../redux/actions/imageActions';

class ImageListModal extends React.Component {
  state = {
    isOpen: false,
    isOptionChanged: false,
    newImage: {},
    imageList: [],
  };


  // show or hide popup modal
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // show image change layout or filter layout functionality
  isOptionChangedToggle() {
    this.setState({
      isOptionChanged: !this.state.isOptionChanged,
    });
  }

  // TODO: Should update image list
  // myArray = myArray.filter( ( el ) => !toRemove.includes( el ) );
  render() {
    console.log('new image ', this.state.images);
    return (
      <div>
        <button className='modal-change-img-btn' onClick={() => this.toggle()}>
          Change Image
        </button>
        <div
          className='image-list-modal'
          style={{ visibility: this.state.isOpen ? 'visible' : 'hidden' }}
        >
          <h5>Image list modal</h5>

          <div className='image-lists'>
            {this.props.images && this.props.images.map(image => (
              <input
                className='images selectedimage'
                type='image'
                src={image.img}
                alt={image.name}
                onClick={() => this.setState({ newImage: image })}
              />
            ))}
          </div>

          <div className='imagelist-modal-actionBtn'>
            <button className='img-confirm-btn'>Confirm</button>
            <button className='img-cancel-btn' onClick={() => this.toggle()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images.filter(i => !state.images.selectedImages.find(f => f.img === i.img))
//   images: state.images.images.filter(
//     image => !state.images.selectedImages.includes(image)
//   ),
//   selectedImages: state.images.selectedImages,
});


// this.props.images.filter(
//     image => !this.props.selectedImages.includes(image)
//   );
export default connect(mapStateToProps, { filterImage })(ImageListModal);
