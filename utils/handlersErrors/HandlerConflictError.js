/* ПОПЫТКА РЕГИСТРАЦИИ ПО ДАННЫМИ УЖЕ ИМЕЮЩИМСЯ В БД */
class HandlerConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = HandlerConflictError;
