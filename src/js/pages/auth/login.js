
import { loginUser } from '../../api/auth/auth_api.js';

const loginForm = document.querySelector('#login_form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await loginUser(email, password);

        localStorage.setItem('token', response.token);

        window.location.href = '/index.html';
    } catch (error) {
        console.error('Ошибка авторизации:', error);
    }
});
