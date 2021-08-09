/* РЕСУРС НЕ НАЙДЕН */
class HandlerNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = HandlerNotFoundError;
