class ReserveMongoRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.database = mongoClient.db("locadora");
    this.reserveCollection = this.database.collection("reserves");
  }

  async save(reserve) {
    await this.reserveCollection.insertOne(reserve);
  }

  async list() {
    const output = await this.reserveCollection
      .find({
        projection: {
          _id: 0,
          reserveId: 1,
          movieId: 1,
          status: 1,
          expireAt: 1,
        },
      })
      .toArray();
    return output;
  }

  async getById(reserveId) {
    return this.reserveCollection.findOne(
      { reserveId: reserveId },
      {
        projection: {
          _id: 0,
          reserveId: 1,
          movieId: 1,
          status: 1,
          expireAt: 1,
        },
      }
    );
  }

  async update(reserve) {
    await this.reserveCollection.replaceOne(
      { reserveId: reserve.reserveId },
      reserve,
      {
        upsert: true,
      }
    );
  }

  async getExpired() {
    return this.reserveCollection
      .find({ expireAt: { $lt: new Date() }, status: "WAITING" })
      .toArray();
  }
}

module.exports = ReserveMongoRepository;
