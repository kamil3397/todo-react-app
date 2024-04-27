import axios from "axios";


export const makeRequest = async (method: 'POST' | 'GET', url: string, data?: unknown) => {
    const token = localStorage.getItem('accessToken');

    if (method === 'POST') {
        return await axios.post(`http://localhost:4000${url}`, data, {
            headers: {
                Authorization: token
            }
        })
    }
    if (method === 'GET') {
        return await axios.get(`http://localhost:4000${url}`, {
            headers: {
                Authorization: token
            }
        })
    }

}