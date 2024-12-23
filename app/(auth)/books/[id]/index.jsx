import React, { useEffect, useState, useContext } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AuthContext } from '~/app/AuthContext';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import fetchServer from '~/lib/fetchServer';
import { getBooksFromStorage } from '~/lib/utils';

export default function Index() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userToken } = useContext(AuthContext);

  const [dataToRender, setDataToRender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = dataToRender?.pages.length;

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { isConnected } = await NetInfo.fetch();
        if (isConnected) {
          try {
            const result = await fetchServer({
              url: `660/books/${id}`,
              method: 'GET',
              token: userToken,
            });
            console.log('BOOK FROM SERVER');
            setDataToRender(result);
          } catch (error) {
            console.error('Error fetching data from the server with internet conection: ', error);
            loadBooksFromStorage();
          }
        } else {
          loadBooksFromStorage();
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadBooksFromStorage = async () => {
    try {
      console.log('BOOK FROM STORAGE');
      const books = await getBooksFromStorage();
      const book = books.find((bk) => bk.id == id);
      return setDataToRender(book);
    } catch (error) {
      console.error('Error loading books from storage: ', error);
    }
  };

  return (
    <View className='flex-1 bg-primary-100 px-4 pt-10 pb-8'>
      <ScrollView
        className='flex-1 w-full max-w-2xl'
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingBottom: 100,
        }}
      >
        {loading ? (
          <>
            <Skeleton className='bg-white w-full h-16 mb-12' />
            <Skeleton className='bg-white w-full h-96' />
          </>
        ) : (
          <>
            {dataToRender ? (
              <>
                <Text className='text-3xl font-bold text-center text-gray-800 mt-4'>
                  {dataToRender?.title}
                </Text>
                <Text className='text-xl italic text-center text-gray-600 mt-2'>
                  {dataToRender?.author}
                </Text>
                <View className='p-6 w-full bg-papper rounded-xl shadow-md min-h-[60%] justify-center items-center mt-10'>
                  <Text className='text-xl text-black text-center font-medium'>
                    {dataToRender?.pages[currentPage]}
                  </Text>
                  <Text className='text-gray-500 text-center mt-4'>
                    {currentPage + 1} de {totalPages}
                  </Text>
                </View>
              </>
            ) : (
              <Text className='text-3xl font-bold text-center text-gray-800 mt-4'>
                Este libro no esta disponible en este momento
              </Text>
            )}
          </>
        )}
      </ScrollView>

      {/* Buttons next page and prev page */}
      {dataToRender && (
        <View className='flex-row items-center justify-around bg-gray-100  w-screen pb-6 shadow-sm bg-primary-100 absolute bottom-0 left-0 right-0'>
          {currentPage === 0 ? (
            <View className='w-40'></View>
          ) : (
            <Button
              variant='secondary'
              onPress={goBack}
              className='shadow-md flex-row items-center justify-between w-40'
            >
              <MaterialIcons name='chevron-left' size={20} color='white' />
              <Text className='text-white p-0 font-bold text-md'>Anterior</Text>
            </Button>
          )}

          {totalPages > currentPage + 1 ? (
            <Button
              variant='secondary'
              onPress={goNext}
              className='shadow-md flex-row items-center justify-between w-40'
            >
              <Text className='text-white p-0 font-bold text-md'>Siguiente</Text>
              <MaterialIcons name='chevron-right' size={20} color='white' />
            </Button>
          ) : (
            <Button
              variant='success'
              onPress={router.back}
              className='shadow-md flex-row items-center justify-between w-40'
            >
              <Text className='text-white p-0 font-bold text-md '>Fin</Text>
              <MaterialIcons name='chevron-right' size={20} color='white' />
            </Button>
          )}
        </View>
      )}
    </View>
  );
}
