import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Estado GLOBAL das notificações (Context API).
 * Qualquer componente pode disparar um toast com useToast().showToast(...)
 * sem precisar repassar props por vários níveis.
 */
const ToastContext = createContext(null);

const MAX_TOASTS = 5;
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = nextId++;
    setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, type, title, message, duration }]);
    return id;
  }, []);

  const value = useMemo(() => ({ toasts, showToast, removeToast }), [toasts, showToast, removeToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

// Hook personalizado para consumir o contexto
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>');
  }
  return context;
}
