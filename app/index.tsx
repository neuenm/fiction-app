import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from './AuthContext';

export default function Index() {
  const { userToken, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userToken) {
        router.replace('/(auth)/books');
      } else {
        router.replace('/(noAuth)/login');
      }
    }
  }, [loading, userToken, router]);

  return null;
}
