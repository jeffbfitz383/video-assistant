import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Video extends Component {
  handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    alert('Form submitted'); // Display an alert when the form is submitted
    // Add any additional logic or API calls here
  };

  render() {
    return (
      <div className='player-wrapper'>
        <h1>Printing</h1>
        {/* Other components or elements */}
        <ReactPlayer
          className='react-player fixed-bottom'
          url='video.mp4'
          width='75%'
          height='75%'
          controls={true}
        />
        <form onSubmit={this.handleSubmit}>
          <h3>This is a form</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Video;