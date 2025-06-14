import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      router.push('/');
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.message || "Error de red");
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.Authorization;
    router.push('/login');
  };
  
  const register = async (username, email, password) => {
     try {
      await api.post('/auth/register', { username, email, password });
      router.push('/login');
    } catch (error) {
       console.error("Error en el registro:", error.response?.data?.message || "Error de red");
       throw new Error(error.response?.data?.message || "Error al registrarse");
    }
  };


  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading, isAuthenticated: !!token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;