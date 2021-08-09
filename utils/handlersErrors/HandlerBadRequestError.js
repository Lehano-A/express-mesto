/* НЕДЕЙСТВИТЕЛЬНЫЙ ОШИБКИ В ЗАПРОСЕ КЛИЕНТА */
class HandlerBadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = HandlerBadRequestError;
