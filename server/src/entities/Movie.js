const crypto = require('crypto')
class Movie {
  constructor(movieId, name, synopsis, rating, isAvailable) {
    this.movieId = movieId;
    this.name = name;
    this.synopsis = synopsis;
    this.rating = rating;
    this.isAvailable = isAvailable
  }

  static create(name, synopsis, rating, isAvailable){
    const movieId = crypto.randomUUID()
    return new Movie(movieId, name, synopsis, rating, isAvailable)
  }

  static restore(moviedId, name, synopsis, rating, isAvailable){
    return new Movie(moviedId, name, synopsis, rating, isAvailable)
  }
}

module.exports = Movie
