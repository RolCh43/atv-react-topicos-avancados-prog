import Toast from './Toast.jsx';
import { useToast } from '../../context/ToastContext.jsx';

/**
 * Renderiza todas as notificações ativas do contexto global.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
}
