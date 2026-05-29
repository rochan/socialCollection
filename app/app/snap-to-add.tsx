import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../src/context/AppContext';
import { analyzePhotos, AnalysisResult } from '../src/services/imageAnalysis';
import { Colors, Spacing, FontSize } from '../src/constants/theme';

type Step = 'capture' | 'analyzing' | 'confirm';

export default function SnapToAddScreen() {
  const { state, dispatch } = useAppState();
  const router = useRouter();
  const [step, setStep] = useState<Step>('capture');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const myCollections = state.collections.filter((c) => c.ownerId === state.currentUser.id);
  const [collectionId, setCollectionId] = useState(myCollections[0]?.id ?? '');

  async function handleCapture() {
    // In production, this would open the camera via expo-image-picker
    // For MVP demo, we simulate taking a photo
    setStep('analyzing');

    try {
      const analysisResult = await analyzePhotos(['mock-photo-uri']);
      setResult(analysisResult);
      setTitle(analysisResult.title ?? '');
      setStep('confirm');
    } catch {
      Alert.alert('Error', 'Failed to analyze photo. Try manual entry.');
      setStep('capture');
    }
  }

  function handleSave() {
    if (!title.trim() || !collectionId) return;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `item-${Date.now()}`,
        collectionId,
        title: title.trim(),
        photos: ['snap-photo-placeholder'],
        notes: notes.trim() || undefined,
        status: 'tried',
        rating: undefined,
        tags: result?.tags ?? [],
        metadata: result?.metadata ?? {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    router.back();
  }

  if (step === 'analyzing') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.analyzingText}>Analyzing your photo...</Text>
        <Text style={styles.analyzingSubtext}>Detecting labels, text, and details</Text>
      </View>
    );
  }

  if (step === 'confirm' && result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>
            {Math.round(result.confidence * 100)}% confidence
          </Text>
        </View>

        <Text style={styles.label}>Title (detected)</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Collection</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chipRow}>
            {myCollections.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.chip, collectionId === c.id && styles.chipActive]}
                onPress={() => setCollectionId(c.id)}
              >
                <Text style={styles.chipText}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {result.category && (
          <>
            <Text style={styles.label}>Detected Category</Text>
            <Text style={styles.detected}>{result.category}</Text>
          </>
        )}

        {result.tags && result.tags.length > 0 && (
          <>
            <Text style={styles.label}>Suggested Tags</Text>
            <View style={styles.chipRow}>
              {result.tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {result.metadata && Object.keys(result.metadata).length > 0 && (
          <>
            <Text style={styles.label}>Detected Details</Text>
            {Object.entries(result.metadata).map(([key, val]) => (
              <Text key={key} style={styles.metaLine}>{key}: {String(val)}</Text>
            ))}
          </>
        )}

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add your thoughts..."
          multiline
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>✓ Save Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.retryBtn} onPress={() => setStep('capture')}>
          <Text style={styles.retryText}>📸 Retake Photo</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Capture step
  return (
    <View style={styles.centered}>
      <Text style={styles.captureIcon}>📸</Text>
      <Text style={styles.captureTitle}>Snap to Add</Text>
      <Text style={styles.captureDesc}>
        Take a photo of a wine label, beer can, menu, or recipe and we'll extract the details for you.
      </Text>

      <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
        <Text style={styles.captureBtnText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.manualBtn} onPress={() => router.replace('/add-item')}>
        <Text style={styles.manualBtnText}>Enter Manually Instead</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg, backgroundColor: Colors.background },
  captureIcon: { fontSize: 64 },
  captureTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.md },
  captureDesc: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, marginBottom: Spacing.lg },
  captureBtn: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  captureBtnText: { color: Colors.surface, fontWeight: '700', fontSize: FontSize.lg },
  manualBtn: { padding: Spacing.sm },
  manualBtnText: { color: Colors.textSecondary, fontSize: FontSize.md },
  analyzingText: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text, marginTop: Spacing.md },
  analyzingSubtext: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  confidenceBadge: { backgroundColor: Colors.secondary + '22', borderRadius: 8, padding: Spacing.sm, alignSelf: 'flex-start', marginBottom: Spacing.md },
  confidenceText: { fontSize: FontSize.sm, color: Colors.secondary, fontWeight: '600' },
  label: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: { backgroundColor: Colors.surface, borderRadius: 8, padding: Spacing.sm, borderWidth: 1, borderColor: Colors.border, fontSize: FontSize.md },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  detected: { fontSize: FontSize.md, color: Colors.primary, textTransform: 'capitalize' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: { backgroundColor: Colors.surface, borderRadius: 20, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderWidth: 1, borderColor: Colors.border },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  chipText: { fontSize: FontSize.sm, color: Colors.text },
  tagChip: { backgroundColor: Colors.primaryLight + '33', borderRadius: 8, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  tagText: { fontSize: FontSize.xs, color: Colors.primary },
  metaLine: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'capitalize' },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: Spacing.md, alignItems: 'center', marginTop: Spacing.xl },
  saveBtnText: { color: Colors.surface, fontWeight: '700', fontSize: FontSize.lg },
  retryBtn: { alignItems: 'center', padding: Spacing.md, marginTop: Spacing.sm },
  retryText: { color: Colors.textSecondary, fontSize: FontSize.md },
});
