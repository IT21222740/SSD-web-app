// src/components/VirtualTryOn.js
import React, { useState } from 'react';
import axios from 'axios';

const VirtualTryOn = () => {
  const [image, setImage] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/try-on', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setImage(URL.createObjectURL(new Blob([response.data.result_image_data])));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="Virtual Try-On" />}
    </div>
  );
};

export default VirtualTryOn;
