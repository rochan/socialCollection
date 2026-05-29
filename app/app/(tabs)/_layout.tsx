import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: { color: Colors.text, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Feed', tabBarIcon: () => null, tabBarLabel: '🏠 Feed' }}
      />
      <Tabs.Screen
        name="collections"
        options={{ title: 'Collections', tabBarIcon: () => null, tabBarLabel: '📚 Collections' }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: 'Add', tabBarIcon: () => null, tabBarLabel: '➕ Add' }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{ title: 'Wishlist', tabBarIcon: () => null, tabBarLabel: '💫 Wishlist' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: () => null, tabBarLabel: '👤 Profile' }}
      />
    </Tabs>
  );
}
