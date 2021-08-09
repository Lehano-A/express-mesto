/* НЕТ ПРАВ ДОСТУПА К РЕСУРСУ */
class HandlerForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = HandlerForbiddenError;
