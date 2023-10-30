import React, { useState } from "react";
import "./App.css"; // Importing external CSS file

const App = () => {
  // State variables for search term, media type, search results, and error
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // State variable to store favorite items

  // Asynchronous function to handle search functionality
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/search?term=${searchTerm}&media=${mediaType}`
      );
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle favorite functionality
  const handleFavorite = (result) => {
    console.log("Adding to favorites:", result); // Add this log to check the item being added
    setFavorites((prevFavorites) => [...prevFavorites, result]);
  };

  // Function to remove an item from favorites
  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
  };

  // JSX code representing the structure of the app, styled using inline styles and css
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px",
      }}
    >
      {/* Input and select elements for search term and media type selection */}
      <div style={{ marginBottom: "20px" }}>
        <div>
          <p className="heading">iTunes Search App</p>
          <p className="text">
            Search for content within the iTunes and Apple Bookstore
          </p>
          <p className="text">
            Your favorite items will be displayed at the bottom.
          </p>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          style={{ padding: "10px", marginRight: "10px", borderRadius: "10px" }}
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="media-select"
        >
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="music">Music</option>
          <option value="musicVideo">Music Video</option>
          <option value="audiobook">Audio Book</option>
          <option value="shortFilm">Short Film</option>
          <option value="tvShow">TV Show</option>
          <option value="software">Software</option>
          <option value="ebook">e-book</option>
        </select>
        {/* Button to trigger the search functionality */}
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Display error message if there's an error */}
      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Error fetching data: {error}
        </div>
      )}

      {/* Displaying search results in a formatted manner */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {searchResults.map((result, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              maxWidth: "600px",
            }}
          >
            {/* Displaying different attributes of each search result */}
            <p className="track">
              <strong>Track:</strong> {result.trackName}
            </p>
            <p className="artist">
              <strong>Artist:</strong> {result.artistName}
            </p>{" "}
            <p className="collection">
              <strong>Collection:</strong> {result.collectionName}
            </p>{" "}
            <p className="released">
              <strong>Released:</strong> {result.releaseDate}
            </p>{" "}
            <p className="description">
              <strong>Description:</strong> {result.longDescription}
            </p>{" "}
            <p className="url">
              <strong>Preview URL:</strong> {result.previewUrl}
            </p>{" "}
            <button
              onClick={() => handleFavorite(result)}
              className="favorite-button"
              data-testid="favorite-button" // Set a data-testid attribute for the favorite button
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
      {/* Display favorite items separately */}
      <div>
        <h2 className="favorite-heading">Favorites</h2>
        <p className="text">Your list of favorite items</p>
        {favorites.map((fav, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              maxWidth: "600px",
            }}
          >
            <p className="track">
              <strong>Track:</strong> {fav.trackName}
            </p>
            <p className="artist">
              <strong>Artist:</strong> {fav.artistName}
            </p>{" "}
            <button
              onClick={() => handleRemoveFavorite(index)}
              className="remove-button"
              data-testid="remove-button" // Set a data-testid attribute for the remove button
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
