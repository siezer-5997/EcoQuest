import React, { useState } from 'react';
import Header from './Header'; // Assuming you have a reusable header component
import "./UploadEcoActionPage.css"

const UploadEcoActionPage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [ratings, setRatings] = useState([null, null, null]); // Store ratings by 3 evaluators
  const [comments, setComments] = useState(['', '', '']); // Store comments by 3 evaluators

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission, such as sending to the backend or saving to state
    console.log('Image uploaded:', image);
    console.log('Description:', description);
    // Add additional logic for handling ratings/comments submission
  };

  return (
    <div className="upload-eco-action-page">
      <Header />
      <div className="upload-content">
        <h1 className="upload-title">Upload Your Eco-Friendly Action</h1>
        <form onSubmit={handleSubmit}>
          <div className="image-upload">
            <label htmlFor="image-upload">
              Upload an image of your eco-friendly action (e.g., tree planting)
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <img src={image} alt="Uploaded preview" className="image-preview" />}
          </div>
          <div className="description">
            <label htmlFor="description">Provide a description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your eco-friendly action..."
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        <h2>Evaluation by Others</h2>
        <div className="ratings">
          {ratings.map((rating, index) => (
            <div key={index} className="rating">
              <h3>Evaluator {index + 1}</h3>
              <p>Rating: {rating || "Not yet rated"}</p>
              <p>Comment: {comments[index] || "No comment yet"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadEcoActionPage;
