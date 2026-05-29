import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

export default function AddScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add to your collection</Text>
      <Text style={styles.subtitle}>Choose how you want to add a new item</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/snap-to-add')}
      >
        <Text style={styles.optionIcon}>📸</Text>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Snap to Add</Text>
          <Text style={styles.optionDesc}>
            Take a photo and we'll fill in the details automatically
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/add-item')}
      >
        <Text style={styles.optionIcon}>✏️</Text>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Manual Entry</Text>
          <Text style={styles.optionDesc}>
            Enter all the details yourself
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/add-collection')}
      >
        <Text style={styles.optionIcon}>📁</Text>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>New Collection</Text>
          <Text style={styles.optionDesc}>
            Create a new collection to organize your items
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.lg },
  heading: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.lg },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionIcon: { fontSize: 32, marginRight: Spacing.md },
  optionText: { flex: 1 },
  optionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  optionDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
});
