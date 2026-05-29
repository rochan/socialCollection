import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAppState } from '../../src/context/AppContext';
import { ItemCard } from '../../src/components/ItemCard';
import { getTemplate } from '../../src/data/templates';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useAppState();
  const router = useRouter();

  const collection = state.collections.find((c) => c.id === id);
  const items = state.items.filter((i) => i.collectionId === id);
  const template = collection ? getTemplate(collection.templateId) : undefined;

  if (!collection) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Collection not found</Text>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert('Delete Collection', 'Are you sure? This will delete all items.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch({ type: 'DELETE_COLLECTION', payload: collection!.id });
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: collection.name }} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => router.push(`/item/${item.id}`)} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.icon}>{template?.icon ?? '📦'}</Text>
            <Text style={styles.title}>{collection.name}</Text>
            {collection.description && (
              <Text style={styles.description}>{collection.description}</Text>
            )}
            <Text style={styles.meta}>
              {items.length} item{items.length !== 1 ? 's' : ''} ·{' '}
              {collection.visibility === 'private' ? '🔒 Private' : '🌐 Public'}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add-item')}>
                <Text style={styles.addBtnText}>+ Add Item</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No items yet. Add your first one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
  header: { marginBottom: Spacing.md, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  description: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.xs, textAlign: 'center' },
  meta: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: Spacing.xs },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  addBtnText: { color: Colors.surface, fontWeight: '600' },
  deleteBtn: {
    backgroundColor: Colors.error + '15',
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  deleteBtnText: { color: Colors.error, fontWeight: '600' },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xl },
});
