// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../AuthContext';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.accessToken) {
        login(data.accessToken);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder='Username'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Password'
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
