// Import required modules
const express = require("express");
const http = require("http");
const querystring = require("querystring");
const helmet = require("helmet"); // Helmet helps secure your Express apps by setting various HTTP headers
const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
const path = require("path");

// Create an instance of the express application
const app = express();
app.use(helmet()); // Use Helmet middleware to secure the Express app
app.use(cors()); // Enable CORS for all routes

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000; // Set the port for the server to run on, defaulting to 5000 if no environment variable is set

//if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
//}

// Handle GET request to the /search endpoint
app.get("/search", async (req, res) => {
  try {
    const { term, media } = req.query; // Extract 'term' and 'media' parameters from the query
    const queryParams = querystring.stringify({
      term: term,
      media: media,
      limit: 5,
    }); // Create a query string from the 'term', 'media', and 'limit' parameters

    // Set up options for the http request to the iTunes API
    const options = {
      hostname: "itunes.apple.com",
      path: `/search?${queryParams}`,
      method: "GET",
    };

    // Make a request to the iTunes API
    const request = http.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });

      // When the response ends, set the appropriate content type and send the data back to the client
      response.on("end", () => {
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      });
    });

    // Handle errors during the HTTP request
    request.on("error", (error) => {
      console.error("Error fetching data from iTunes API: ", error);
      res.status(500).json({ error: "Error fetching data from iTunes API" });
    });

    request.end(); // End the request
  } catch (error) {
    // Handle any internal server errors
    console.error("Internal Server Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
