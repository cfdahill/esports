const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/esportdb", {useNewUrlParser: true}
);

//The below code is to console log the db data to verify that it is properly connecting to the db
// mongoose.connection.on('open', function(err, doc){
//   console.log("connection established");
//   mongoose.connection.db.collection('games', function(err, docs) {
//     // Check for error
//     if(err) return console.log(err);
//     // Walk through the cursor
//     docs.find().each(function(err, doc) {
//         // Check for error
//         if(err) return console.err(err);
//         // Log document
//         console.log(doc);
//     });
//   });
// });

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });