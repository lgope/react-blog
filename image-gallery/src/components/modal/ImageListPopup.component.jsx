import React from 'react';
import ReactDom from 'react-dom';
// import './modal.styles.css';

// redux stuff
import { connect } from 'react-redux';
import { changeImage } from '../../redux/actions/imageActions';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '10px',
  height: '80%',
  maxWidth: '350px',
  borderRadius: '5px',
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

const IMAGE_LIST_STYLES = {
  height: '699px',
  maxHeight: '700px',
  overflow: 'scroll',
};

class ImageListPopup extends React.Component {
  state = {
    newImage: {},
  };

  handleConfirm() {
    // TODO: condition not working
    if (this.state.newImage) {
      this.props.changeImage(this.props.currentImage, this.state.newImage);
      alert('Image changed successfully!');
      return this.props.onClose();
    }
    return alert('Please select an image!');
  }

  render() {
    console.log('newi ', this.state.newImage);
    const { open, onClose } = this.props;
    if (!open) return null;
    return ReactDom.createPortal(
      <div>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          {/* <div className='image-list-modal'> */}
          <div className=''>
            <p>Select an image</p>

            <div style={IMAGE_LIST_STYLES}>
              {this.props.images &&
                this.props.images.map(image => (
                  <input
                    key={image.char_id}
                    className='images selectedimage'
                    type='image'
                    src={image.img}
                    alt={image.name}
                    onClick={() => this.setState({ newImage: image })}
                  />
                ))}
            </div>

            <div className='imagelist-modal-actionBtn'>
              <button
                className='img-confirm-btn'
                onClick={this.handleConfirm.bind(this)}
              >
                Confirm
              </button>
              <button className='img-cancel-btn' onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('portal')
    );
  }
}

const mapStateToProps = state => ({
  // excluding images which already added to canvas
  images: state.images.images.filter(
    i => !state.images.selectedImages.find(f => f.img === i.img)
  ),
});

export default connect(mapStateToProps, { changeImage })(ImageListPopup);
