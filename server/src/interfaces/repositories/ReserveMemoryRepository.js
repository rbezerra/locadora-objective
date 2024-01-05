class ReserveMemoryRepository {
  constructor() {
    this.reserves = [];
  }

  async save(reserve) {
    this.reserves.push(reserve);
    return Promise.resolve();
  }

  async list() {
    return Promise.resolve(this.reserves);
  }

  async getById(reserveId) {
    const reserve = this.reserves.find(
      (reserve) => reserve.reserveId === reserveId
    );
    return Promise.resolve(reserve);
  }

  async update(reserve) {
    const reserveToUpdateIndex = await this.reserves.findIndex(
      (m) => m.reserveId === reserve.reserveId
    );
    if (reserveToUpdateIndex < 0) throw new Error("Reserve not found");
    this.reserves[reserveToUpdateIndex] = reserve;
  }
}

module.exports = ReserveMemoryRepository;
