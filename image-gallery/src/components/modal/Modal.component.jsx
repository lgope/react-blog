import React, { useState } from 'react';
import settingIcon from '../../asstes/settingss.png';

// import './modal.styles.css';

class Modal extends React.Component {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggle = () => setIsOpen(!isOpen);
  state = {
      isOpen: false
  }

  toggle () {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggle()}>
          <img src={settingIcon} alt='settings' />
        </button>
        <div
          className='popup-menu'
          style={{ visibility: this.state.isOpen ? 'visible' : 'hidden' }}
        >
        <button onClick={() => this.toggle()}>X</button>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </div>
      </div>
    );
  }
}

export default Modal;
