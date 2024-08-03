import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://127.0.0.1:8000';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
        const { access_token, session_data } = response.data;
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('session_id', session_data.session_id);
        await AsyncStorage.setItem('expires_at', session_data.expires_at);
        return access_token;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        const session_id = await AsyncStorage.getItem('session_id');
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('session_id');
        await AsyncStorage.removeItem('expires_at');
        await axios.post(`${BASE_URL}/api/user/logout`, {}, {
            headers: {
                'session-id': session_id
            }
        });
    } catch (error) {
        throw error;
    }
};

const isLoggedIn = async () => {
    try {
        const expires_at = await AsyncStorage.getItem('expires_at');
        if (!expires_at) {
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('session_id');
            await AsyncStorage.removeItem('expires_at');
            return false;
        }
        if (new Date(expires_at.replace(/\.\d+/, match => match.substring(0, 4))) > Date.now()) {
            const session_id = await AsyncStorage.getItem('session_id');
            if (session_id) {
                const response = await axios.get(`${BASE_URL}/api/user/session/loggedin`, {
                    headers: {
                        'session_id': `Bearer ${session_id}`
                    }
                });
                return response.data.response;
            }
        } else {
            await logout();
            return false;
        }
    } catch (err) {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('session_id');
        await AsyncStorage.removeItem('expires_at');
        throw err;
    }
};

const details = async () => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${BASE_URL}/api/user/protected/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

const userFeedQuestions = async () => {
    try {
        const response = await axios(`${BASE_URL}/api/feeds/questions`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export { login, logout, isLoggedIn, details, userFeedQuestions };
