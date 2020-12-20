import React from 'react';
import settingIcon from '../../asstes/settingss.png';
import ImageListModal from './ImageListModal.component'
import './modal.styles.css';


// redux stuff
import { connect } from 'react-redux';
import { filterImage } from '../../redux/actions/imageActions';

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
  async handleSliderChange(event) {
    // updating options value
    await this.setState({
      options: this.state.options.map((option, index) =>
        index !== this.state.selectedOptionIndex
          ? option
          : { ...option, value: event.target.value }
      ),
    });

    // this.props.image.filter = this.state.options;
    // const updatedCanvasImages = this.props.selectedImages.map(image =>
    //   image.img === this.props.image.img
    //      { ...this.props.image, filter: this.state.options }
    //     : image
    // );

    // // updating local storage
    // localStorage.setItem('selectedImages', JSON.stringify(updatedCanvasImages));

    this.props.filterImage(this.props.image, this.state.options)
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

    console.log('so ', this.state.canvasImages);

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
              {/* TODO: show styles */}
              <img
                src={this.props.image.img}
                style={{ height: '129px', width: '150px' }}
                alt=''
              />
              {/* <button className='modal-change-img-btn'>Change Image</button> */}
              <ImageListModal/>
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
                handleChange={this.handleSliderChange.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedImages: state.images.selectedImages,
});

export default connect(mapStateToProps, { filterImage })(Modal);
