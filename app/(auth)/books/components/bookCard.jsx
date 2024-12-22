import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '~/components/ui/button';

export default function BookCard({
  book: { id, image, title, author, description },
  selectedBook,
  setSelectedBook,
}) {
  const handlePress = () => {
    if (selectedBook === id) {
      setSelectedBook(null);
    } else {
      setSelectedBook(id);
    }
  };

  return (
    <View className='relative w-full sm:w-64 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 m-2 '>
      {/* Card Image */}
      <View className='relative w-full h-96 md:h-80 overflow-hidden bg-gray-50'>
        <Image
          source={{ uri: image }}
          alt='Book Cover'
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }} // Ajustar imagen sin recortar
          className='w-full h-full object-cover border border-gray-100' // Borde gris con NativeWind
        />
      </View>

      {/* Card Content */}
      <View className='p-4 h-28'>
        <Text className='text-lg font-semibold text-gray-800 truncate'>{title}</Text>
        <Text className='text-sm text-gray-500 truncate'>Autor: {author}</Text>
        <Text className='text-xs text-gray-500 truncate mt-1'>Descripcion: {description}</Text>
      </View>

      {/* Hover Overlay */}
      {selectedBook === id && (
        <View
          className='absolute top-0 left-0 right-0 bottom-0  justify-center items-center'
          style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }}
        >
          <Button
            variant={'secondary'}
            //   onPress={handleLogin}
          >
            <Text className='text-white font-bold text-lg'>Leer Libro</Text>
          </Button>
        </View>
      )}

      {/* Touchable to detect press */}
      <TouchableOpacity
        className='absolute top-0 left-0 right-0 bottom-0'
        onPress={handlePress}
        activeOpacity={1}
      />
    </View>
  );
}
