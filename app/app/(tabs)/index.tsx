import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppState } from '../../src/context/AppContext';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function FeedScreen() {
  const { state } = useAppState();

  const feedItems = state.feed
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getUser = (userId: string) => state.users.find((u) => u.id === userId);
  const getItem = (itemId?: string) => state.items.find((i) => i.id === itemId);
  const getCollection = (colId?: string) => state.collections.find((c) => c.id === colId);

  function renderFeedItem({ item }: { item: typeof feedItems[0] }) {
    const user = getUser(item.userId);
    const collectionItem = getItem(item.itemId);
    const collection = getCollection(item.collectionId);

    let description = '';
    switch (item.type) {
      case 'new_item':
        description = `added "${collectionItem?.title ?? 'an item'}" to ${collection?.name ?? 'a collection'}`;
        break;
      case 'new_collection':
        description = `created a new collection "${collection?.name ?? ''}"`;
        break;
      case 'rating':
        description = `rated "${collectionItem?.title ?? 'an item'}" ${'★'.repeat(collectionItem?.rating ?? 0)}`;
        break;
      case 'comment':
        description = `commented on "${collectionItem?.title ?? 'an item'}"`;
        break;
    }

    return (
      <View style={styles.feedCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.displayName?.charAt(0) ?? '?'}</Text>
        </View>
        <View style={styles.feedContent}>
          <Text style={styles.feedUser}>{user?.displayName ?? 'Unknown'}</Text>
          <Text style={styles.feedDesc}>{description}</Text>
          <Text style={styles.feedTime}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderFeedItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Follow people to see their activity here!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
  feedCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: { color: Colors.surface, fontWeight: '600', fontSize: FontSize.md },
  feedContent: { flex: 1 },
  feedUser: { fontWeight: '600', fontSize: FontSize.md, color: Colors.text },
  feedDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  feedTime: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 4 },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xl },
});
