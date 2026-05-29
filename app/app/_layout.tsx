import React from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '../src/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="collection/[id]" options={{ headerShown: true, title: 'Collection' }} />
        <Stack.Screen name="item/[id]" options={{ headerShown: true, title: 'Item' }} />
        <Stack.Screen name="add-item" options={{ headerShown: true, title: 'Add Item', presentation: 'modal' }} />
        <Stack.Screen name="add-collection" options={{ headerShown: true, title: 'New Collection', presentation: 'modal' }} />
        <Stack.Screen name="snap-to-add" options={{ headerShown: true, title: 'Snap to Add', presentation: 'modal' }} />
      </Stack>
    </AppProvider>
  );
}
