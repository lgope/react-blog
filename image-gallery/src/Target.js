import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import imageIcon from './asstes/image_icon.png';
import settingIcon from './asstes/settingss.png';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons';

import Modal from './components/modal/Modal.component';

function collect(connect, monitor) {
  console.log('image ', monitor.getItem());
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    image: monitor.getItem(),
  };
}

class Target extends Component {
  state = {
    popupVisibility: 'hidden',
    isShowing: false,
  };

  handlePopupVer() {
    this.setState({ popupVisibility: 'visible' });
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  render() {
    const {
      connectDropTarget,
      hovered,
      selectedImages,
      image,
      updateNewSequence,
      deleteImage,
    } = this.props;

    const backgroundColor = hovered ? 'lightgreen' : 'white';
    const visibility = selectedImages.length === 12 ? 'hidden' : 'visible';

    return connectDropTarget(
      <div className='selected-images-panel'>
        <div className='selected-images'>
          {selectedImages.map((image, i) => (
            <div className='image-container' key={image.char_id}>
              
              <Card
                key={image.char_id}
                index={i}
                id={image.char_id}
                image={image}
                updateNewSequence={updateNewSequence}
              />
              <div className='action-btn'>

                {/* setting icon and popup modal */}
                <Modal image={image} index={i} /> |{' '}
                <button
                  className='remove-btn'
                  onClick={() => deleteImage(image.char_id)}
                  title='Remove'
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}

          {/* image drop field */}
          <div className='drop-field' style={{ backgroundColor, visibility }}>
            <img
              src={imageIcon}
              alt='greenField'
              style={{ paddingTop: '30px', marginTop: '30px' }}
            />
            <p>Drop an image from Media Panel</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DropTarget('image', {}, collect)(Target);
