/* РЕГУЛЯРНОЕ ВЫРАЖЕНИЕ ДЛЯ ПРОВЕРКИ КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
module.exports.regExp = /(http:\/\/|https:\/\/|www\.)[0-9a-zA-Z(/\-+)]+[(.)0-9a-z]+[(/?=%$-+-)]+[0-9a-zA-Z(/?=%$-+-_)]+(\.(png|jpg|jpeg))/; /* ПРОВЕРКА ССЫЛКИ НА КАРТИНКУ */
