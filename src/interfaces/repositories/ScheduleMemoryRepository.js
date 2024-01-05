class ScheduleMemoryRepository {
  constructor() {
    this.schedules = [];
  }

  async save(schedule) {
    this.schedules.push(schedule);
    return Promise.resolve();
  }

  async getById(scheduleId) {
    const schedule = this.schedules.find(
      (schedule) => schedule.scheduleId === scheduleId
    );
    return Promise.resolve(schedule);
  }

  async update(schedule) {
    const scheduleToUpdateIndex = await this.schedules.findIndex(
      (m) => m.scheduleId === schedule.scheduleId
    );
    if (scheduleToUpdateIndex < 0) throw new Error("Schedule not found");
    this.schedules[scheduleToUpdateIndex] = schedule;
  }
}

module.exports = ScheduleMemoryRepository;
