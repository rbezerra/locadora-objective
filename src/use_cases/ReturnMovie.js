class ReturnMovie {
  constructor(movieRepository, scheduleRepository, reserveRepository) {
    this.movieRepository = movieRepository;
    this.scheduleRepository = scheduleRepository;
    this.reserveRepository = reserveRepository;
  }

  async execute(scheduleId) {
    const schedule = await this.scheduleRepository.getById(scheduleId);
    if (!schedule) throw new Error("Schedule not found");
    if (schedule.status !== "LEASED")
      throw new Error("Schedule already finished");
    schedule.status = "RETURNED";
    await this.scheduleRepository.update(schedule);
    const reserve = await this.reserveRepository.getById(schedule.reserveId);
    const movie = await this.movieRepository.getById(reserve.movieId);
    movie.isAvailable = true;
    await this.movieRepository.update(movie);
    return Promise.resolve({
      scheduleId: schedule.scheduleId,
      status: schedule.status,
    });
  }
}

module.exports = ReturnMovie;
