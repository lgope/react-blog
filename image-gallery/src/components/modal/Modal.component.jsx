import React from 'react';
import settingIcon from '../../asstes/settingss.png';
import './modal.styles.css';

// filter stuff
import SidebarItem from '../filter/SidebarItem.component';
import Slider from '../filter/Slider';
class Modal extends React.Component {
  state = {
    isOpen: false,
    isOptionChanged: false,
    selectedOptionIndex: 0,
    canvasImages: JSON.parse(localStorage.getItem('selectedImages')),
    options: this.props.image.filter,
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

  // change filter options value
  handleSliderChange(event) {
    // updating options value
    this.setState({
      options: this.state.options.map((option, index) =>
        index !== this.state.selectedOptionIndex
          ? option
          : { ...option, value: event.target.value }
      ),
    });

    this.props.image.filter = this.state.options;
    const updatedCanvasImages = this.state.canvasImages.map(image =>
      image.img === this.props.image.img
        ? { ...image, filter: this.state.options }
        : image
    );

    localStorage.setItem('selectedImages', JSON.stringify(updatedCanvasImages));

    // console.log('image ', this.props.image);
    console.log('image1 ', this.state.canvasImages);
    console.log('image2 ', updatedCanvasImages);
  }

  getImageStyle() {
    const filters = this.state.options.map(option => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    console.log('ff ', filters);

    return { filter: filters.join(' ') };
  }

  render() {
    const selectedOption = this.state.options[this.state.selectedOptionIndex];

    console.log('so ', selectedOption);

    return (
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
