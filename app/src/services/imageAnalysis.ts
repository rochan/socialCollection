// Image analysis service interface - stub for MVP
// In production, this would call a vision AI API (e.g., Google Vision, OpenAI GPT-4V)

export interface AnalysisResult {
  title?: string;
  category?: string; // template id
  tags?: string[];
  metadata?: Record<string, string | number>;
  confidence: number; // 0-1
}

/**
 * Analyze photos to extract item metadata.
 * MVP: Returns mock results. Replace with real AI service later.
 */
export async function analyzePhotos(_photoUris: string[]): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock: return a plausible wine result
  return {
    title: 'Detected Label',
    category: 'wine',
    tags: ['red', 'detected'],
    metadata: {
      varietal: 'Cabernet Sauvignon',
      region: 'Napa Valley',
      producer: 'Auto-Detected Winery',
      type: 'Red',
    },
    confidence: 0.72,
  };
}
