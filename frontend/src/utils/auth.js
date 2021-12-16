class Auth {
 constructor(url) {
  this.url = url;
 }

//регистрация
 registration({ email, password }) {
  return fetch(`${this.url}/signup`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({ password, email }),
  }).then(this._checkResponse);
 }

 //авторизация
 authorization({ email, password }) {
  return fetch(`${this.url}/signin`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({ password, email }),
  }).then(this._checkResponse);
 }

 //проверка токена
 checkToken(token) {
  return fetch(`${this.url}/users/me`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
  }).then(this._checkResponse);
 }

 // тут проверка ответа
 _checkResponse(res) {
  if (res.ok) {
   return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
 }


}

const auth = new Auth('https://api.mesto.karepanova.ru');

export default auth;