class ListMovies {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(limit, offset) {
    const output = await this.repository?.list(limit, offset);
    return Promise.resolve(output);
  }
}

module.exports = ListMovies;
