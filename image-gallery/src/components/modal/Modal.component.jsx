import React, { useState } from 'react';
import settingIcon from '../../asstes/settingss.png';

import './modal.styles.css';

class Modal extends React.Component {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggle = () => setIsOpen(!isOpen);
  state = {
    isOpen: false,
    isOptionChanged: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  isOptionChangedToggle() {
    this.setState({
      isOptionChanged: !this.state.isOptionChanged,
    });
  }

  render() {
    return (
      <div style={{ zIndex: 1 }}>
        <button className='settings-btn' onClick={() => this.toggle()}>
          <img src={settingIcon} alt='settings' />
        </button>
        <div
          className='popup-menu'
          style={{ visibility: this.state.isOpen ? 'visible' : 'hidden' }}
        >
          
          <div className='modal-header-btn'>
            <button
              className='modal-image-btn'
              onClick={() => this.isOptionChangedToggle()}
            >
              Image
            </button>

            <button
              className='modal-filter-btn'
              onClick={() => this.isOptionChangedToggle()}
            >
              Filter
            </button>

            <button
              className='modal-close-btn'
              onClick={() => this.toggle()}
              title='Close Modal'
            >
              X
            </button>
            <hr />
          </div>

          <div className='modaly-layout'>
            <div className='change-image-field' style={{ display: !this.state.isOptionChanged ? 'block' : 'none' }}>
              <img
                src={this.props.image.img}
                style={{ height: '150px', width: '150px' }}
                alt=''
              />
              <br />
              <button className='modal-change-img-btn'>Change Image</button>
            </div>

            <div className='change-image-field' style={{ display: this.state.isOptionChanged ? 'block' : 'none' }}>
              <p>filter</p>
              <br />
              <button className='modal-change-img-btn'>Change Image</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
