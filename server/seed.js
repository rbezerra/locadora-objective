const fs = require("fs");

const movies = fs.readFileSync("./movies-seed.json");
const jsonMovies = JSON.parse(movies);

module.exports = () => {
  
}
