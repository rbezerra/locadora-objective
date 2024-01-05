class ScheduleMongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.database = mongoClient.db("locadora");
    this.scheduleCollection = this.database.collection("schedules");
  }

  async save(schedule) {
    await this.scheduleCollection.insertOne(schedule);
  }

  async getById(scheduleId) {
    return this.scheduleCollection.findOne(
      { scheduleId: scheduleId },
      {
        projection: {
          _id: 0,
          scheduleId: 1,
          reserveId: 1,
          customerName: 1,
          customerEmail: 1,
          customerPhone: 1,
          status: 1,
        },
      }
    );
  }

  async update(schedule) {
    await this.scheduleCollection.replaceOne(
      { scheduleId: schedule.scheduleId },
      schedule,
      {
        upsert: true,
      }
    );
  }
}

module.exports = ScheduleMongoRepository;
