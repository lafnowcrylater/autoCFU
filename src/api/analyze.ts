import axios from 'axios';
import type { AnalysisResult } from '../types';

const BASE_URL = 'http://localhost:8001';

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.post<AnalysisResult>(`${BASE_URL}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}