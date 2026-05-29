import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAppState } from '../../src/context/AppContext';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useAppState();
  const router = useRouter();

  const item = state.items.find((i) => i.id === id);
  const comments = state.comments.filter((c) => c.itemId === id);
  const reactions = state.reactions.filter((r) => r.itemId === id);
  const [commentText, setCommentText] = useState('');

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Item not found</Text>
      </View>
    );
  }

  const userReaction = reactions.find((r) => r.userId === state.currentUser.id);

  function toggleReaction() {
    if (userReaction) {
      dispatch({ type: 'REMOVE_REACTION', payload: { itemId: item!.id, userId: state.currentUser.id } });
    } else {
      dispatch({
        type: 'ADD_REACTION',
        payload: {
          id: `reaction-${Date.now()}`,
          itemId: item!.id,
          userId: state.currentUser.id,
          type: 'like',
          createdAt: new Date().toISOString(),
        },
      });
    }
  }

  function addComment() {
    if (!commentText.trim()) return;
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        id: `comment-${Date.now()}`,
        itemId: item!.id,
        userId: state.currentUser.id,
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
      },
    });
    setCommentText('');
  }

  function handleDelete() {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch({ type: 'DELETE_ITEM', payload: item!.id });
          router.back();
        },
      },
    ]);
  }

  function addToWishlist() {
    dispatch({
      type: 'ADD_WISHLIST_ITEM',
      payload: {
        id: `wish-${Date.now()}`,
        userId: state.currentUser.id,
        itemId: item!.id,
        title: item!.title,
        category: 'want',
        createdAt: new Date().toISOString(),
      },
    });
    Alert.alert('Added', 'Item added to your wishlist!');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: item.title }} />

      <Text style={styles.title}>{item.title}</Text>
      {item.rating !== undefined && (
        <Text style={styles.rating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
      )}
      <Text style={styles.status}>{item.status.replace('_', ' ')}</Text>

      {item.notes && <Text style={styles.notes}>{item.notes}</Text>}

      {/* Metadata */}
      {Object.entries(item.metadata).length > 0 && (
        <View style={styles.metadataSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          {Object.entries(item.metadata).map(([key, value]) => (
            <View key={key} style={styles.metaRow}>
              <Text style={styles.metaKey}>{key}</Text>
              <Text style={styles.metaValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Tags */}
      {item.tags.length > 0 && (
        <View style={styles.tagsSection}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, userReaction && styles.actionBtnActive]} onPress={toggleReaction}>
          <Text style={styles.actionText}>{userReaction ? '❤️' : '🤍'} {reactions.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={addToWishlist}>
          <Text style={styles.actionText}>💫 Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteAction]} onPress={handleDelete}>
          <Text style={[styles.actionText, { color: Colors.error }]}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Comments */}
      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
        {comments.map((c) => {
          const user = state.users.find((u) => u.id === c.userId);
          return (
            <View key={c.id} style={styles.comment}>
              <Text style={styles.commentUser}>{user?.displayName ?? 'Unknown'}</Text>
              <Text style={styles.commentText}>{c.text}</Text>
            </View>
          );
        })}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg },
  title: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  rating: { fontSize: FontSize.lg, color: Colors.star, marginTop: Spacing.xs },
  status: { fontSize: FontSize.sm, color: Colors.primary, textTransform: 'capitalize', marginTop: Spacing.xs },
  notes: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.md },
  metadataSection: { marginTop: Spacing.lg },
  sectionTitle: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text, marginBottom: Spacing.sm },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.xs, borderBottomWidth: 1, borderBottomColor: Colors.border },
  metaKey: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'capitalize' },
  metaValue: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '500' },
  tagsSection: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.md },
  tag: { backgroundColor: Colors.primaryLight + '33', borderRadius: 8, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  tagText: { fontSize: FontSize.xs, color: Colors.primary },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  actionBtn: { backgroundColor: Colors.surface, borderRadius: 8, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  actionBtnActive: { borderColor: Colors.accent },
  deleteAction: { marginLeft: 'auto' },
  actionText: { fontSize: FontSize.sm, color: Colors.text },
  commentsSection: { marginTop: Spacing.lg },
  comment: { backgroundColor: Colors.surface, borderRadius: 8, padding: Spacing.sm, marginBottom: Spacing.xs },
  commentUser: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.text },
  commentText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  commentInput: { flexDirection: 'row', marginTop: Spacing.sm, gap: Spacing.sm },
  input: { flex: 1, backgroundColor: Colors.surface, borderRadius: 8, padding: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  sendBtn: { backgroundColor: Colors.primary, borderRadius: 8, paddingHorizontal: Spacing.md, justifyContent: 'center' },
  sendText: { color: Colors.surface, fontWeight: '600' },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xl },
});
