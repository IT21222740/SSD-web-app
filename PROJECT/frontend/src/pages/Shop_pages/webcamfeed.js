import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

function Webcam() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.post("http://localhost:5000/try-on"); // Replace with your Flask server URL

        // Validate the base64-encoded image data
        const isValidBase64Image = (data) => {
          const regex = /^data:image\/(jpeg|jpg|gif|png);base64,/; // Accept JPEG, PNG, and GIF formats
          return regex.test(data);
        };

        const imageBase64 = response.data.image_base64;

        if (isValidBase64Image(imageBase64)) {
          setImage(imageBase64); // Set the valid base64 image data
        } else {
          console.error("Invalid base64 image data");
          setImage(""); // Optionally set to a default image or handle error
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    const interval = setInterval(fetchImage, 100); // Fetch the image every 100 milliseconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      {image ? (
        <img src={DOMPurify.sanitize(image)} alt="Camera Feed" />
      ) : (
        <p>No image available</p> // Fallback UI if image is not valid
      )}
    </div>
  );
}

export default Webcam;
