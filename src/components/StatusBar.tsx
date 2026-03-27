import styles from './StatusBar.module.css';
import type { AppState } from '../types';

interface Props {
  state: AppState;
  error?: string;
}

const STATUS_MESSAGES: Record<AppState, string> = {
  idle: 'Ready — upload a plate image to begin',
  uploading: 'Uploading image…',
  analyzing: 'Running colony detection…',
  done: 'Analysis complete',
  error: 'An error occurred',
};

export function StatusBar({ state, error }: Props) {
  return (
    <footer className={`${styles.bar} ${styles[state]}`}>
      <div className={styles.container}>
        <span className={styles.message}>
          {state === 'error' && error ? error : STATUS_MESSAGES[state]}
        </span>
        {state === 'analyzing' && <span className={styles.spinner} />}
      </div>
    </footer>
  );
}
