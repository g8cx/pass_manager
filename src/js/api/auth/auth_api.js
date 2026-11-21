import { apiRequest } from './api.js';

// Авторизация
export async function loginUser(email, password) {
    return await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
}

// Регистрация
export async function registerUser(userData) {
    return await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}