import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultPanel } from './components/ResultPanel';
import { StatusBar } from './components/StatusBar';
import { analyzeImage } from './api/analyze';
import type { AnalysisResult, AppState } from './types';
import styles from './App.module.css';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [state, setState] = useState<AppState>('idle');
  const [error, setError] = useState<string | undefined>();

  async function handleAnalyze() {
    if (!file) return;
    setState('analyzing');
    setError(undefined);
    setResult(null);

    try {
      const data = await analyzeImage(file);
      setResult(data);
      setState('done');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      setState('error');
    }
  }

  const isAnalyzing = state === 'analyzing';

  return (
    <div className={styles.page}>
      {/* Top nav */}
      <header className={styles.topbar}>
        <nav className={styles.topLinks}>
          <span>Automated Colony Counter</span>
          <span className={styles.divider}>|</span>
          <span>Staphylococcus aureus</span>
        </nav>
      </header>

      {/* Site header */}
      <div className={styles.siteHeader}>
        <div className={styles.container}>
          <div className={styles.brandRow}>
            <h1 className={styles.brand}>Auto<span>CFU</span></h1>
            {/* <div className={styles.brandMeta}>
              <span className={styles.tag}>RESEARCH TOOL</span>
              <span className={styles.tag}>S. AUREUS</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>

            {/* Left column */}
            <div className={styles.leftCol}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>INPUT</span>
                <h2 className={styles.sectionTitle}>Plate Image</h2>
              </div>

              <p className={styles.intro}>
                Upload a <em>S.aureus</em> plate photo, then click start.
              </p>

              <ImageUploader onFileSelect={setFile} disabled={isAnalyzing} />

              <button
                className={styles.analyzeBtn}
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing…' : 'Start Analysis'}
              </button>
            </div>

            {/* Right column */}
            <div className={styles.rightCol}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>OUTPUT</span>
                <h2 className={styles.sectionTitle}>Results</h2>
              </div>

              {result ? (
                <ResultPanel result={result} />
              ) : (
                <div className={styles.emptyResult}>
                  <p>Results will appear here after analysis.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Footer status */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <StatusBar state={state} error={error} />
        </div>
      </footer>
    </div>
  );
}