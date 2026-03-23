import { useRef, useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import styles from './ImageUploader.module.css';

interface Props {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function ImageUploader({ onFileSelect, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      className={`${styles.dropzone} ${dragging ? styles.dragging : ''} ${disabled ? styles.disabled : ''}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={onChange}
        disabled={disabled}
      />

      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="Selected sample" className={styles.preview} />
          <div className={styles.fileLabel}>{fileName}</div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className={styles.hint}>
            Drop a plate image here<br />
            <span>or click to browse</span>
          </p>
          <p className={styles.meta}>PNG, JPG, TIFF accepted</p>
        </div>
      )}
    </div>
  );
}
