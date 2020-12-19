import React, { useState } from 'react';
import settingIcon from '../../asstes/settingss.png';
import './modal.styles.css';

// filter stuff
import SidebarItem from '../filter/SidebarItem.component';
import Slider from '../filter/Slider';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: 'px',
  },
];

class Modal extends React.Component {
  state = {
    isOpen: false,
    isOptionChanged: false,
    selectedOptionIndex: 0,
    options: DEFAULT_OPTIONS,
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

  handleSliderChange(event) {
    // updating options value
    this.setState({
      options: this.state.options.map((option, index) =>
        index !== this.state.selectedOptionIndex
          ? option
          : { ...option, value: event.target.value }
      ),
    });

    console.log('image ', this.props.image);
  }

  getImageStyle() {
    const filters = this.state.options.map(option => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    console.log('ff ', filters.join(' '));

    return { filter: filters.join(' ') };
  }

  render() {
    const selectedOption = this.state.options[this.state.selectedOptionIndex];

    console.log('so ', selectedOption);

    return (
      // <div >
      <div>
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

          <div className='modal-layout'>
            <div
              className='change-image-field'
              style={{
                display: !this.state.isOptionChanged ? 'block' : 'none',
              }}
            >
              <img
                src={this.props.image.img}
                style={{ height: '129px', width: '150px' }}
                alt=''
              />
              <button className='modal-change-img-btn'>Change Image</button>
            </div>

            <div
              className='change-image-field'
              style={{ display: this.state.isOptionChanged ? 'block' : 'none' }}
            >
              <div className='image-filter'>
                <div className='preview-image-filter'>
                  <img
                    className='preview-image'
                    src={this.props.image.img}
                    style={this.getImageStyle()}
                    alt=''
                  />
                </div>

                <div className='filter-options'>
                  {this.state.options.map((option, index) => {
                    return (
                      <SidebarItem
                        key={index}
                        name={option.name}
                        active={index === this.state.selectedOptionIndex}
                        handleClick={() =>
                          this.setState({ selectedOptionIndex: index })
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {/* slider input */}
              <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                unit={selectedOption.unit}
                handleChange={e => this.handleSliderChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
