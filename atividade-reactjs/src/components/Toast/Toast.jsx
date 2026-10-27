import { useEffect } from 'react';
import './Toast.css';

const ICONS = { success: '✔', error: '✖', info: 'ℹ', warning: '!' };

/**
 * Notificação toast individual. Recebe tipo, título e mensagem via props
 * e se fecha sozinha após "duration" ms (useEffect + setTimeout)
 * ou quando o usuário clica no botão de fechar.
 */
export default function Toast({ id, type = 'info', title, message, duration = 4000, onClose }) {
  useEffect(() => {
    const timerId = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timerId); // limpa o timer se o toast for fechado antes
  }, [id, duration, onClose]);

  return (
    <div
      className={`toast toast--${type}`}
      role={type === 'error' ? 'alert' : 'status'}
      style={{ '--toast-duration': `${duration}ms` }}
    >
      <span className="toast__icon" aria-hidden="true">
        {ICONS[type]}
      </span>
      <div className="toast__content">
        {title && <p className="toast__title">{title}</p>}
        <p className="toast__message">{message}</p>
      </div>
      <button type="button" className="toast__close" aria-label="Fechar notificação" onClick={() => onClose(id)}>
        ×
      </button>
      <span className="toast__timer" aria-hidden="true" />
    </div>
  );
}
