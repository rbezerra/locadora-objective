class ListMovies {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(limit, offset) {
    const output = await this.repository?.list(limit, offset);
    for (let movie of output) {
      delete movie.isAvailable;
    }
    return Promise.resolve({ movies: output });
  }
}

module.exports = ListMovies;
