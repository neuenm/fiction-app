import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBooksFromStorage() {
  try {
    const storedBooks = await AsyncStorage.getItem('books');

    return storedBooks ? JSON.parse(storedBooks) : [];
  } catch (error) {
    console.error('Error reading books: ', error);
    return [];
  }
}
