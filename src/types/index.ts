export interface AnalysisResult {
  total_cfu: number;
  annotated_image_url: string; // base64 or URL
  confidence?: number;
  iou?: number;
  processing_time_ms?: number;
}

export type AppState = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';