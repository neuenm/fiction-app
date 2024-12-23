import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../app/AuthContext'; // Importa el contexto para obtener el logout
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
  const { logout } = useContext(AuthContext); // Obtén el token del usuario y la función logout

  return (
    <View className='flex-row items-center justify-between px-4 bg-white shadow-md pb-6 pt-3'>
      <View className='flex-row items-center'>
        <TouchableOpacity className='flex-row items-center' onPress={logout}>
          <MaterialIcons name='logout' size={24} color='black' className='rotate-180' />
          <Text className='ml-2'>Salir</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row items-center'>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png',
          }}
          className='w-10 h-10 rounded-full'
        />
        <Text className='ml-2 text-md font-semibold'>{'Neuen Mobilia'}</Text>
      </View>
    </View>
  );
}
