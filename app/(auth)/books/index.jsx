import React, { useEffect, useState, useContext } from 'react';
import { Text, ScrollView, RefreshControl, View, TouchableWithoutFeedback } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import BookCard from './components/bookCard';
import { getBooksFromStorage, saveBooksToStorage } from '~/lib/utils';
import fetchServer from '~/lib/fetchServer';
import { Skeleton } from '~/components/ui/skeleton';
import Header from '~/components/ui/header';
import { AuthContext } from '~/app/AuthContext';

export default function Index() {
  const { userToken } = useContext(AuthContext);

  const [dataToRender, setDataToRender] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const loadBooksFromStorage = async () => {
      try {
        console.log('BOOKS FROM STORAGE');
        const books = await getBooksFromStorage();
        return setDataToRender(books);
      } catch (error) {
        console.error('Error loading books from storage: ', error);
      }
    };
    //

    setIsLoading(true);
    try {
      const { isConnected } = await NetInfo.fetch();

      if (isConnected) {
        try {
          const result = await fetchServer({
            url: '660/books',
            method: 'GET',
            token: userToken,
          });
          console.log('BOOKS FROM SERVER');
          saveBooksToStorage(result);
          setDataToRender(result);
        } catch (error) {
          console.error('Error fetching data from the server with internet conection: ', error);
          loadBooksFromStorage();
        }
      } else {
        loadBooksFromStorage();
      }
    } catch (error) {
      console.error('Error checking internet connection or fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedBook(null);
      }}
    >
      <View className='flex-1 relative'>
        <ScrollView
          className='flex bg-primary-100 px-4'
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchData} />}
        >
          {isLoading && (
            <>
              <Skeleton className='relative w-full sm:w-64 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 m-2 h-[450px]' />
              <Skeleton className='relative w-full sm:w-64 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 m-2 h-[450px]' />
            </>
          )}
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
            <Text className='text-3xl font-bold text-center text-gray-800 mt-4'>
              No hay libros para mostrar en este momento
            </Text>
          )}
        </ScrollView>
        <Header className='absolute bottom-0 left-0 right-0 bg-white' />
      </View>
    </TouchableWithoutFeedback>
  );
}
