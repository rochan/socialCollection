import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppState } from '../../src/context/AppContext';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';
import { WishlistItem, WishlistCategory } from '../../src/models';

const CATEGORY_LABELS: Record<WishlistCategory, string> = {
  want: '💜 Want',
  gift_ideas: '🎁 Gift Ideas',
  try_next: '🔜 Try Next',
};

export default function WishlistScreen() {
  const { state, dispatch } = useAppState();

  const wishlistItems = state.wishlist.filter(
    (w) => w.userId === state.currentUser.id
  );

  function removeItem(id: string) {
    dispatch({ type: 'REMOVE_WISHLIST_ITEM', payload: id });
  }

  function renderItem({ item }: { item: WishlistItem }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.remove}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.category}>{CATEGORY_LABELS[item.category]}</Text>
        {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Your wishlist is empty. Add items you want to try!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text, flex: 1 },
  remove: { fontSize: 18, color: Colors.textLight, padding: Spacing.xs },
  category: { fontSize: FontSize.sm, color: Colors.primary, marginTop: Spacing.xs },
  notes: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xl },
});
