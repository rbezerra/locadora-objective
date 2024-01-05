class MovieMongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.database = mongoClient.db("locadora");
    this.moviesCollection = this.database.collection("movies");
  }

  async save(movie) {
    await this.moviesCollection.insertOne(movie);
  }

  async update(movie) {
    await this.moviesCollection.replaceOne({ movieId: movie.movieId }, movie, {
      upsert: true,
    });
  }

  async getById(movieId) {
    return this.moviesCollection.findOne(
      { movieId: movieId },
      {
        projection: {
          _id: 0,
          movieId: 1,
          name: 1,
          synopsis: 1,
          rating: 1,
          isAvailable: 1,
        },
      }
    );
  }

  async list(limit = 10, offset = 0) {
    const output = await this.moviesCollection
      .find(
        { isAvailable: true },
        {
          projection: { _id: 0, movieId: 1, name: 1, synopsis: 1, rating: 1 },
        }
      )
      .toArray();
    return output;
  }
}

module.exports = MovieMongoRepository;
