import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Webcam() {

    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
          try {
            const response = await axios.post('http://localhost:5000/try-on'); // Replace with your Flask server URL
            setImage(response.data.image_base64); // Use the base64-encoded image data
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
    
        const interval = setInterval(fetchImage, 100); // Fetch the image every 100 milliseconds
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);
  return (
    <div>
    <img src={image} alt="Camera Feed" />
  </div>
  )
}

export default Webcam
