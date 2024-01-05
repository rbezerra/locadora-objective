const crypto = require("crypto");

class Schedule {
  constructor(
    scheduleId,
    reserveId,
    customerName,
    customerEmail,
    customerPhone,
    status
  ) {
    this.scheduleId = scheduleId;
    this.reserveId = reserveId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.status = status;
  }

  static create(reserveId, customerName, customerEmail, customerPhone) {
    const scheduleId = crypto.randomUUID();

    return new Schedule(
      scheduleId,
      reserveId,
      customerName,
      customerEmail,
      customerPhone,
      "LEASED"
    );
  }

  static restore(
    scheduleId,
    reserveId,
    customerName,
    customerEmail,
    customerPhone,
    status
  ) {
    return new Schedule(
      scheduleId,
      reserveId,
      customerName,
      customerEmail,
      customerPhone,
      status
    );
  }
}

module.exports = Schedule;
