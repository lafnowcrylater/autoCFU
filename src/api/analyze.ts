import axios, { isAxiosError } from 'axios';
import type { AnalysisResult } from '../types';

const BASE_URL = (import.meta.env.VITE_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
const REQUEST_TIMEOUT_MS = 20_000;

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await axios.post<AnalysisResult>(`${BASE_URL}/analyze`, formData, {
      timeout: REQUEST_TIMEOUT_MS,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Analysis request timed out. Please try again or check server load.');
      }
      if (!error.response) {
        throw new Error('Unable to connect to the backend server. Please verify the API is running.');
      }
      const responseData = error.response.data as { detail?: string; message?: string } | undefined;
      const message = responseData?.detail || responseData?.message || error.message;
      throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
    }
    throw error;
  }
}
