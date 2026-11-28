
import { API_URL } from './config.js';

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw {
            status: response.status,
            message: data?.message || 'Request error',
            data,
        };
    }

    return data;
}
