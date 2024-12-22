import { Text, TouchableOpacity, ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import BookCard from './components/bookCard';

export default function Index() {
  const [dataToRender, setDataToRender] = useState(null);
  const { logout } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);

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
    <ScrollView
      className='flex bg-primary px-4 pt-10 pb-20'
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {dataToRender?.map((book, key) => (
        <BookCard
          book={book}
          key={key}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      ))}
    </ScrollView>
  );
}
