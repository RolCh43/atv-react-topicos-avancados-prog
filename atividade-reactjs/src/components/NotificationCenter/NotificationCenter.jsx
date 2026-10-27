import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './NotificationCenter.css';

const examples = [
  { type: 'success', label: 'Sucesso', title: 'Operação concluída', message: 'Seus dados foram salvos com sucesso.' },
  { type: 'error', label: 'Erro', title: 'Erro ao salvar', message: 'Não foi possível salvar. Tente novamente.' },
  { type: 'info', label: 'Informação', title: 'Nova atualização', message: 'Uma nova versão do sistema está disponível.' },
  { type: 'warning', label: 'Aviso', title: 'Sessão expirando', message: 'Sua sessão expira em 5 minutos.' },
];

const durationOptions = [
  { value: 3000, label: '3 segundos' },
  { value: 5000, label: '5 segundos' },
  { value: 8000, label: '8 segundos' },
];

export default function NotificationCenter() {
  const [duration, setDuration] = useState(5000);
  const { showToast } = useToast();

  return (
    <div className="notification-center">
      <Dropdown
        label="Tempo de exibição"
        options={durationOptions}
        selected={duration}
        onSelect={(option) => setDuration(option.value)}
      />

      <div className="notification-center__buttons">
        {examples.map(({ type, label, title, message }) => (
          <button
            key={type}
            type="button"
            className={`btn btn--${type}`}
            onClick={() => showToast({ type, title, message, duration })}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="notification-center__hint">
        As notificações desaparecem automaticamente ou podem ser fechadas no botão ×.
      </p>
    </div>
  );
}
