import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppState } from '../../src/context/AppContext';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function ProfileScreen() {
  const { state } = useAppState();
  const user = state.currentUser;

  const myCollections = state.collections.filter((c) => c.ownerId === user.id);
  const myItems = state.items.filter((i) =>
    myCollections.some((c) => c.id === i.collectionId)
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.displayName.charAt(0)}</Text>
        </View>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{myCollections.length}</Text>
          <Text style={styles.statLabel}>Collections</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{myItems.length}</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.followingIds.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.followerIds.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg },
  avatarContainer: { alignItems: 'center', marginBottom: Spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: { color: Colors.surface, fontSize: FontSize.xxl, fontWeight: '700' },
  displayName: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  username: { fontSize: FontSize.md, color: Colors.textSecondary },
  bio: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.sm, textAlign: 'center' },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
});
