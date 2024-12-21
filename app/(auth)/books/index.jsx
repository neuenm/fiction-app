import { Text, View, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';

export default function Index() {
  const [dataToRender, setDataToRender] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/books');

        const result = await response.json();

        saveBooksToStorage(result);
        return result;
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    NetInfo.fetch().then(async (state) => {
      let books = [];
      if (state.isConnected) {
        books = await fetchData();
      } else {
        books = await getBooksFromStorage();
      }
      setDataToRender(books);
    });
  }, []);

  const saveBooksToStorage = async (books) => {
    try {
      await AsyncStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
      console.error('Error saving books: ', error);
    }
  };

  const getBooksFromStorage = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error('Error reading books: ', error);
      return [];
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      {/* <Text>{dataToRender ? JSON.stringify(dataToRender) : 'Loading...'}</Text> */}
    </View>
  );
}
