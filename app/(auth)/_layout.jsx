import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Stack, Redirect } from 'expo-router';

export default function PrivateLayout() {
  const { userToken } = useContext(AuthContext);

  if (!userToken) {
    return <Redirect href='/(noAuth)/login' />;
  }

  return <Stack />;
}
