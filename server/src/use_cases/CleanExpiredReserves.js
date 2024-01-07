class CleanExpiredReserves {
  constructor(movieRepository, reserveRepository) {
    this.movieRepository = movieRepository;
    this.reserveRepository = reserveRepository;
  }

  async execute() {
    const reserves = await this.reserveRepository.getExpired();
    for (const reserve of reserves) {
      const movie = await this.movieRepository.getById(reserve.movieId);
      movie.isAvailable = true;
      await this.movieRepository.update(movie);
      reserve.status = "EXPIRED";
      await this.reserveRepository.update(reserve);
    }
    return Promise.resolve(reserves.length);
  }
}

module.exports = CleanExpiredReserves;
