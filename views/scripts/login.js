const loginFormDOM = document.querySelector('#loginForm');

loginFormDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  window.location = '/'
})