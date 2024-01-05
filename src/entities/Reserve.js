const crypto = require("crypto")

class Reserve {
  constructor(reserveId, movieId, expireAt, status) {
    this.reserveId = reserveId;
    this.movieId = movieId;
    this.expireAt = expireAt;
    this.status = status;
  }

  static create(movieId) {
    const reserveId = crypto.randomUUID();
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const expireAt = now;
    const status = "WAITING";

    return new Reserve(reserveId, movieId, expireAt, status);
  }

  static restore(reserveId, movieId, expireAt, status) {
    return new Reserve(reserveId, movieId, expireAt, status);
  }
}

module.exports = Reserve;
