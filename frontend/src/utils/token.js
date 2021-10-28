class Token {
 constructor() {
  this.key = 'jwt';
 }

 saveToken(token) {
  localStorage.setItem(this.key, token); //сохраняется в localStorage (имя jwt, значение token)
 }

 getToken() {
  return localStorage.getItem(this.key);
 }

 removeToken() {
  localStorage.removeItem(this.key);
 }
}
const token = new Token();

export default token;