import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize } from '../constants/theme';
import { Collection } from '../models';
import { getTemplate } from '../data/templates';

interface Props {
  collection: Collection;
  itemCount: number;
  onPress?: () => void;
}

export function CollectionCard({ collection, itemCount, onPress }: Props) {
  const template = getTemplate(collection.templateId);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.icon}>{template?.icon ?? '📦'}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>{collection.name}</Text>
          <Text style={styles.meta}>
            {template?.name ?? 'Custom'} · {itemCount} item{itemCount !== 1 ? 's' : ''}
          </Text>
        </View>
        {collection.visibility === 'private' && (
          <Text style={styles.lock}>🔒</Text>
        )}
      </View>
      {collection.description ? (
        <Text style={styles.description} numberOfLines={2}>{collection.description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginRight: Spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  meta: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  lock: {
    fontSize: 16,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
