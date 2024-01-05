const Schedule = require("../entities/Schedule");

class ConfirmSchedule {
  constructor(scheduleRepository, reserveRepository, movieRepository) {
    this.scheduleRepository = scheduleRepository;
    this.reserveRepository = reserveRepository;
    this.movieRepository = movieRepository;
  }

  async execute(reserveId, customer) {
    const reserve = await this.reserveRepository.getById(reserveId);
    if (!reserve) throw new Error("Reserve not found");
    if (reserve.status !== "WAITING")
      throw new Error("Reserve is not available");
    const newSchedule = Schedule.create(
      reserveId,
      customer.name,
      customer.email,
      customer.phone
    );
    this.scheduleRepository.save(newSchedule);
    reserve.status = "FINISHED";
    await this.reserveRepository.update(reserve);
    return Promise.resolve({
      scheduleId: newSchedule.scheduleId,
      status: newSchedule.status,
    });
  }
}

module.exports = ConfirmSchedule;
