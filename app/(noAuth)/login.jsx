// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { AuthContext } from '../AuthContext';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Image } from 'react-native';
import logo from '~/assets/images/logo.png';
import '../global.css';
import fetchServer from '~/lib/fetchServer';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await fetchServer({
        url: 'login',
        method: 'POST',
        body: { email, password },
      });

      if (data.accessToken) {
        login(data.accessToken);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  const { width } = Dimensions.get('window');

  return (
    <View className='flex-1 items-center justify-center bg-gray-100 px-4'>
      <View className='flex-[6] items-center justify-center '>
        <View className='align-center justify-center'>
          <Image
            source={logo}
            style={{ width, height: 100, resizeMode: 'contain' }} // Usamos el ancho dinámico
          />
        </View>
        <Text className='text-2xl font-bold text-gray-800'>Bienvenido!</Text>
        <Text className='text-gray-600'>Inicia sesion para comenzar</Text>
      </View>

      <View className='w-full max-w-sm flex-[4]'>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          className='mb-4 border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-800'
        />
        <Input
          placeholder='Contraseña'
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          className='mb-6 border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-800'
        />

        <Button
          onPress={handleLogin}
          className='w-full bg-primary py-3 rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700'
        >
          <Text className='text-white font-bold text-lg'>Login</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
