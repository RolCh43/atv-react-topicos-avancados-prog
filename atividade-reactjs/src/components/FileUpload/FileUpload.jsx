import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './FileUpload.css';

const STATUS_LABELS = {
  idle: 'Aguardando arquivo',
  ready: 'Pronto para enviar',
  uploading: 'Enviando…',
  paused: 'Pausado',
  done: 'Concluído',
};

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Simula o upload de um arquivo, alimentando a ProgressBar.
 * (Nenhum arquivo é realmente enviado para um servidor.)
 */
export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);
  const { showToast } = useToast();

  // useEffect 1: enquanto o status for "uploading", incrementa o progresso a cada 300 ms
  useEffect(() => {
    if (status !== 'uploading') return undefined;

    const intervalId = setInterval(() => {
      setProgress((current) => Math.min(current + Math.random() * 10 + 2, 100));
    }, 300);

    return () => clearInterval(intervalId); // limpeza ao pausar/cancelar/desmontar
  }, [status]);

  // useEffect 2: detecta quando o progresso chega a 100%
  useEffect(() => {
    if (status === 'uploading' && progress >= 100) {
      setStatus('done');
      showToast({
        type: 'success',
        title: 'Upload concluído',
        message: `O arquivo "${file?.name}" foi enviado com sucesso.`,
      });
    }
  }, [progress, status, file, showToast]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setProgress(0);
    setStatus('ready');
    showToast({ type: 'info', title: 'Arquivo selecionado', message: selectedFile.name });
  };

  const handleStart = () => {
    if (!file) {
      showToast({
        type: 'warning',
        title: 'Nenhum arquivo',
        message: 'Selecione um arquivo antes de iniciar o envio.',
      });
      return;
    }
    if (status === 'done') setProgress(0);
    setStatus('uploading');
  };

  const handlePause = () => setStatus('paused');

  const handleCancel = () => {
    setStatus('ready');
    setProgress(0);
    showToast({ type: 'error', title: 'Upload cancelado', message: 'O envio do arquivo foi interrompido.' });
  };

  const handleClear = () => {
    setFile(null);
    setProgress(0);
    setStatus('idle');
    if (inputRef.current) inputRef.current.value = '';
  };

  const startLabel = { paused: 'Continuar', done: 'Enviar novamente' }[status] ?? 'Iniciar upload';
  const canCancel = status === 'uploading' || status === 'paused';

  return (
    <div className="upload">
      <label className="upload__dropzone">
        <input ref={inputRef} type="file" className="sr-only" onChange={handleFileChange} />
        <span className="upload__icon" aria-hidden="true">
          📁
        </span>
        <span className="upload__name">{file ? file.name : 'Clique para escolher um arquivo'}</span>
        <small>{file ? formatFileSize(file.size) : 'Qualquer formato (simulação)'}</small>
      </label>

      <ProgressBar value={progress} label={`Status: ${STATUS_LABELS[status]}`} animated={status === 'uploading'} />

      <div className="upload__actions">
        {status === 'uploading' ? (
          <button type="button" className="btn btn--ghost" onClick={handlePause}>
            Pausar
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={handleStart}>
            {startLabel}
          </button>
        )}
        <button type="button" className="btn btn--danger" onClick={handleCancel} disabled={!canCancel}>
          Cancelar
        </button>
        <button type="button" className="btn btn--ghost" onClick={handleClear} disabled={!file || status === 'uploading'}>
          Limpar
        </button>
      </div>
    </div>
  );
}
