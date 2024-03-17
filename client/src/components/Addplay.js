// import React from 'react';
// import ReactPlayer from 'react-player';

// function Addplay() {
//     const divStyle = {
//         minHeight: '1000px',
//         width: '100%', // Adjust the width as needed
//     };

//     return (
//         <div style={divStyle}>
//             <ReactPlayer
//                 url="client/public/39670960 (1).mp4"
//                 width="100%"
//                 height="auto" // Let the height adjust automatically
//                 controls
//                 muted // Add this line to mute the video
//             />
//         </div>
//     );
// }

// export default Addplay;


import React, { Component } from 'react'
import ReactPlayer from 'react-player'



class Video extends Component {
    render () {
      return (
        <div className='player-wrapper'>
          <h1>printing</h1>  
          <img src ="logo192.png"/>
          <img src ="https://th.bing.com/th/id/OIP.ty4h_2HJDoC9LKBtB8zlOQHaE8?w=272&h=181&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7"/>
          <ReactPlayer
            className='react-player fixed-bottom'
            url= 'nothing.mp4'
            width='100%'
            height='100%'
            controls = {true}

          />
        </div>
      )
    }
  }

  export default Video;