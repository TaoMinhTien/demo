import { url } from 'inspector';
import { LOGOUT_URL } from '../constants/apiUrl';
import { removeFromLocal } from './security';


type ApiParams = {
    url: string;
    data?: any
}

const getAPI = async ({ url, data }: ApiParams) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('ERROR', errorData.message || 'ERROR');
            return null;
        }
        const result = await response.json();
        return result;
    } catch (e) {
        console.log('ERROR', e);
        return null;
    }
}



const postAPI = async ({ url, data }: ApiParams) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('ERROR', errorData.message || 'ERROR');
            return null;
        }
        const result = await response.json();
        return result;
    } catch (e) {
        console.log('ERROR', e);
        return null;
    }
}


// const checkToken = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         window.location.href = '/login';
//         throw new Error('No token found');
//     }
//     return token;
// };

const putAPI = async ({ url, data }: ApiParams) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Request failed');
            throw error;
        }

        return await response.json();
    } catch (e) {
        console.error('API Error:', e);
        throw e;
    }
}

const deleteAPI = async ({ url }: ApiParams) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('ERROR', errorData.message || 'ERROR');
            return null;
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.log('ERROR', e);
        return null;
    }
}



const logoutUser = (): void => {
    if (typeof window !== 'undefined') {
        postAPI({ url: LOGOUT_URL, data: null });
        removeFromLocal("token");
    }
}
export { getAPI, postAPI, logoutUser, putAPI,deleteAPI };