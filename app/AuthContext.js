import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, [userToken]);

  const login = async (token) => {
    setUserToken(token);
    await SecureStore.setItemAsync('access_token', token);
  };

  const logout = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync('access_token');
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
