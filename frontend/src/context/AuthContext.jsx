import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` : 'http://localhost:5000/api/auth';

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/me`);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user', error);
            logout();
            setLoading(false);
        }
    };

    const register = async (userData) => {
        const res = await axios.post(`${API_URL}/register`, userData);
        return res.data;
    };

    const verifyOTP = async (verifyData) => {
        const res = await axios.post(`${API_URL}/verify-otp`, verifyData);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data);
        }
        return res.data;
    };

    const login = async (userData) => {
        const res = await axios.post(`${API_URL}/login`, userData);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data);
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, verifyOTP, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
