import styles from './ResultPanel.module.css';
import type { AnalysisResult } from '../types';

interface Props {
  result: AnalysisResult;
}

export function ResultPanel({ result }: Props) {
  const imgSrc = result.annotated_image_url.startsWith('data:')
    ? result.annotated_image_url
    : `data:image/png;base64,${result.annotated_image_url}`;

  return (
    <div className={styles.panel}>
      <div className={styles.stats}>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>CFU Count</div>
          <div className={styles.statValue}>{result.total_cfu.toLocaleString()}</div>
        </div>

        {result.confidence !== undefined && (
          <div className={styles.statBlock}>
            <div className={styles.statLabel}>Confidence</div>
            <div className={styles.statValue}>{(result.confidence * 100).toFixed(1)}%</div>
          </div>
        )}

        {result.processing_time_ms !== undefined && (
          <div className={styles.statBlock}>
            <div className={styles.statLabel}>Processing Time</div>
            <div className={styles.statValue}>{result.processing_time_ms} ms</div>
          </div>
        )}
      </div>

      <div className={styles.annotatedWrapper}>
        <div className={styles.sectionLabel}>Annotated Output</div>
        <img src={imgSrc} alt="Annotated plate" className={styles.annotated} />
      </div>
    </div>
  );
}
