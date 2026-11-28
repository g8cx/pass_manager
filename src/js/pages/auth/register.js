
import { registerUser } from '../../api/auth/auth_api.js';

const registerForm = document.querySelector('#register_form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);

    const userData = {
        nickname: formData.get('nickname'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await registerUser(userData);

        localStorage.setItem('token', response.token);

        window.location.href = '/index.html';
    } catch (error) {
        console.error('Ошибка регистрации:', error);
    }
});
