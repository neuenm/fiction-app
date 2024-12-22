import { Text, TouchableOpacity, ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import BookCard from './components/bookCard';
import { getBooksFromStorage } from '~/lib/utils';
import fetchServer from '~/lib/fetchServer';

export default function Index() {
  const [dataToRender, setDataToRender] = useState(null);
  const { logout } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchServer({
          url: 'books',
          method: 'GET',
        });

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

  return (
    <ScrollView
      className='flex bg-primary-100 px-4 pt-10 pb-20'
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {dataToRender?.length > 0 ? (
        dataToRender.map((book, key) => (
          <BookCard
            book={book}
            key={key}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        ))
      ) : (
        <Text>No hay libros</Text>
      )}
    </ScrollView>
  );
}
