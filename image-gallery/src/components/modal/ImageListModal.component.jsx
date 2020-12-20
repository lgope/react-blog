import React from 'react';
import settingIcon from '../../asstes/settingss.png';
import './modal.styles.css';

// redux stuff
import { connect } from 'react-redux';
import { filterImage } from '../../redux/actions/imageActions';

class ImageListModal extends React.Component {
  state = {
    isOpen: false,
    isOptionChanged: false,
    selectedOptionIndex: 0,
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

  render() {
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

          <div className="image-lists">
              {this.props.images && this.props.images.map(image => <input className='images selectedimage' type="image" src={image.img} alt={image.name} />)}
              {/* {this.props.images && this.props.images.map(image => <img className='images' src={image.img} alt={image.name} />)} */}
          </div>

          <div className='imagelist-modal-actionBtn'>
            <button className="img-confirm-btn">Confirm</button>
            <button className="img-cancel-btn" onClick={() => this.toggle()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
});

export default connect(mapStateToProps, { filterImage })(ImageListModal);
