import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../../src/context/AppContext';
import { CollectionCard } from '../../src/components/CollectionCard';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function CollectionsScreen() {
  const { state } = useAppState();
  const router = useRouter();

  const myCollections = state.collections.filter(
    (c) => c.ownerId === state.currentUser.id
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={myCollections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectionCard
            collection={item}
            itemCount={state.items.filter((i) => i.collectionId === item.id).length}
            onPress={() => router.push(`/collection/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push('/add-collection')}
          >
            <Text style={styles.addBtnText}>+ New Collection</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  addBtnText: { color: Colors.surface, fontWeight: '600', fontSize: FontSize.md },
});
