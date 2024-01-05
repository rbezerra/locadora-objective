const Reserve = require("../entities/Reserve");

class ReserveMovie {
  constructor(movieRepository, reserveRepository) {
    this.movieRepository = movieRepository;
    this.reserveRepository = reserveRepository;
  }

  async execute(movieId) {
    const movie = await this.movieRepository.getById(movieId)
    if(!movie) throw new Error("Movie not found")
    if(!movie.isAvailable) throw new Error("Movie is not available")
    const newReserve = Reserve.create(movieId)
    await this.reserveRepository.save(newReserve)
    movie.isAvailable = false
    await this.movieRepository.update(movie)
    return {
      reserveId: newReserve.reserveId,
      status: newReserve.status
    }
  }
}

module.exports = ReserveMovie;
