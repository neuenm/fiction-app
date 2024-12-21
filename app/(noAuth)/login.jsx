// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

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
      <Input
        placeholder='Username'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
        className='mt-4'
      />

      <Input placeholder='Password' value={password} secureTextEntry onChangeText={setPassword} />

      <Button onPress={handleLogin}>
        <Text>Login</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
