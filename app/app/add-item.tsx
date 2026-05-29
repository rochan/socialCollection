import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../src/context/AppContext';
import { getTemplate, TEMPLATES } from '../src/data/templates';
import { Colors, Spacing, FontSize } from '../src/constants/theme';
import { ItemStatus } from '../src/models';

const STATUS_OPTIONS: { value: ItemStatus; label: string }[] = [
  { value: 'owned', label: '✅ Owned' },
  { value: 'tried', label: '🍽️ Tried' },
  { value: 'want_to_try', label: '🔜 Want to Try' },
  { value: 'archived', label: '📦 Archived' },
];

export default function AddItemScreen() {
  const { state, dispatch } = useAppState();
  const router = useRouter();

  // Default to first collection
  const myCollections = state.collections.filter((c) => c.ownerId === state.currentUser.id);
  const [collectionId, setCollectionId] = useState(myCollections[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<ItemStatus>('tried');
  const [tagsInput, setTagsInput] = useState('');
  const [metadata, setMetadata] = useState<Record<string, string>>({});

  const selectedCollection = state.collections.find((c) => c.id === collectionId);
  const template = selectedCollection ? getTemplate(selectedCollection.templateId) : undefined;

  function handleSave() {
    if (!title.trim() || !collectionId) return;

    const parsedMetadata: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(metadata)) {
      const numVal = Number(value);
      parsedMetadata[key] = isNaN(numVal) ? value : numVal;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `item-${Date.now()}`,
        collectionId,
        title: title.trim(),
        photos: [],
        notes: notes.trim() || undefined,
        rating: rating > 0 ? rating : undefined,
        status,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        metadata: parsedMetadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    router.back();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Collection picker */}
      <Text style={styles.label}>Collection *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.collectionPicker}>
        {myCollections.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.collectionChip, collectionId === c.id && styles.collectionChipActive]}
            onPress={() => setCollectionId(c.id)}
          >
            <Text style={styles.chipText}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Title *</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Item name" />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Your thoughts..."
        multiline
      />

      <Text style={styles.label}>Rating</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Text style={styles.star}>{n <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
        {rating > 0 && (
          <TouchableOpacity onPress={() => setRating(0)}>
            <Text style={styles.clearRating}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {STATUS_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.statusBtn, status === opt.value && styles.statusBtnActive]}
            onPress={() => setStatus(opt.value)}
          >
            <Text style={styles.statusBtnText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tags (comma separated)</Text>
      <TextInput style={styles.input} value={tagsInput} onChangeText={setTagsInput} placeholder="e.g., red, bordeaux, special" />

      {/* Template-specific fields */}
      {template && (
        <>
          <Text style={styles.sectionTitle}>{template.name} Details</Text>
          {template.fields.map((field) => (
            <View key={field.key}>
              <Text style={styles.label}>{field.label}</Text>
              {field.type === 'select' && field.options ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.selectRow}>
                    {field.options.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.selectBtn, metadata[field.key] === opt && styles.selectBtnActive]}
                        onPress={() => setMetadata({ ...metadata, [field.key]: opt })}
                      >
                        <Text style={styles.selectBtnText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <TextInput
                  style={styles.input}
                  value={metadata[field.key] ?? ''}
                  onChangeText={(v) => setMetadata({ ...metadata, [field.key]: v })}
                  placeholder={field.label}
                  keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                />
              )}
            </View>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  label: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginTop: Spacing.lg },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: FontSize.md,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  collectionPicker: { maxHeight: 44 },
  collectionChip: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  collectionChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  chipText: { fontSize: FontSize.sm, color: Colors.text },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  star: { fontSize: 28, color: Colors.star },
  clearRating: { fontSize: FontSize.sm, color: Colors.textLight, marginLeft: Spacing.sm },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  statusBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  statusBtnText: { fontSize: FontSize.sm },
  selectRow: { flexDirection: 'row', gap: Spacing.xs },
  selectBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  selectBtnText: { fontSize: FontSize.sm, color: Colors.text },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  saveBtnText: { color: Colors.surface, fontWeight: '700', fontSize: FontSize.lg },
});
