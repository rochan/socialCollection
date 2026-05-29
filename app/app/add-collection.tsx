import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../src/context/AppContext';
import { TEMPLATES } from '../src/data/templates';
import { Colors, Spacing, FontSize } from '../src/constants/theme';
import { Visibility } from '../src/models';

export default function AddCollectionScreen() {
  const { dispatch, state } = useAppState();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [visibility, setVisibility] = useState<Visibility>('public');

  function handleCreate() {
    if (!name.trim()) return;

    dispatch({
      type: 'ADD_COLLECTION',
      payload: {
        id: `col-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || undefined,
        visibility,
        ownerId: state.currentUser.id,
        collaboratorIds: [],
        templateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    router.back();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Collection Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g., Weekend Wines"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="What's this collection about?"
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.templateGrid}>
        {TEMPLATES.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.templateBtn, templateId === t.id && styles.templateBtnActive]}
            onPress={() => setTemplateId(t.id)}
          >
            <Text style={styles.templateIcon}>{t.icon}</Text>
            <Text style={styles.templateName}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Visibility</Text>
      <View style={styles.visibilityRow}>
        <TouchableOpacity
          style={[styles.visBtn, visibility === 'public' && styles.visBtnActive]}
          onPress={() => setVisibility('public')}
        >
          <Text style={styles.visBtnText}>🌐 Public</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.visBtn, visibility === 'private' && styles.visBtnActive]}
          onPress={() => setVisibility('private')}
        >
          <Text style={styles.visBtnText}>🔒 Private</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.createBtnText}>Create Collection</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg },
  label: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: FontSize.md,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  templateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  templateBtn: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
    width: '47%',
  },
  templateBtnActive: { borderColor: Colors.primary },
  templateIcon: { fontSize: 28 },
  templateName: { fontSize: FontSize.sm, marginTop: Spacing.xs, color: Colors.text },
  visibilityRow: { flexDirection: 'row', gap: Spacing.sm },
  visBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  visBtnActive: { borderColor: Colors.primary },
  visBtnText: { fontSize: FontSize.md },
  createBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  createBtnText: { color: Colors.surface, fontWeight: '700', fontSize: FontSize.lg },
});
