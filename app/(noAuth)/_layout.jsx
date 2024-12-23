import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Stack, Redirect } from 'expo-router';

export default function PublicLayout() {
  const { userToken } = useContext(AuthContext);

  if (userToken) {
    return <Redirect href='/(auth)/books' />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
