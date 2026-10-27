import { useState } from 'react';
import Tabs from '../Tabs/Tabs.jsx';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import './UserProfile.css';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const orders = [
  { id: '#10234', date: '2026-09-12', total: 349.9, status: 'Entregue', type: 'success' },
  { id: '#10251', date: '2026-09-28', total: 129.0, status: 'Em transporte', type: 'info' },
  { id: '#10277', date: '2026-10-15', total: 89.9, status: 'Processando', type: 'warning' },
  { id: '#10280', date: '2026-10-20', total: 59.9, status: 'Cancelado', type: 'error' },
];

/* ---------- Aba 1: Visão geral ---------- */
function ProfileOverview() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="profile-overview">
      <div className="profile-overview__avatar" aria-hidden="true">
        MS
      </div>
      <div className="profile-overview__info">
        <h3>Maria Souza</h3>
        <dl className="profile-overview__details">
          <div>
            <dt>E-mail</dt>
            <dd>maria.souza@exemplo.com</dd>
          </div>
          <div>
            <dt>Cidade</dt>
            <dd>Salvador – BA</dd>
          </div>
          <div>
            <dt>Carrinho</dt>
            <dd>
              {totalItems} item(ns) · {currency.format(totalPrice)}
            </dd>
          </div>
        </dl>
        <ProgressBar value={75} label="Perfil completo" />
      </div>
    </div>
  );
}

/* ---------- Aba 2: Pedidos ---------- */
function OrderHistory() {
  return (
    <ul className="orders">
      {orders.map((order) => (
        <li key={order.id} className="order">
          <span className="order__id">Pedido {order.id}</span>
          <time className="order__date" dateTime={order.date}>
            {new Date(`${order.date}T12:00:00`).toLocaleDateString('pt-BR')}
          </time>
          <span className="order__total">{currency.format(order.total)}</span>
          <span className={`badge badge--${order.type}`}>{order.status}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Aba 3: Configurações ---------- */
function ProfileSettings() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({ email: true, sms: false, newsletter: true });
  const [language, setLanguage] = useState('pt-BR');

  // Cada opção do menu tem seu próprio callback (onClick)
  const languageOptions = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'es-ES', label: 'Español' },
  ].map((option) => ({
    ...option,
    onClick: () => showToast({ type: 'info', title: 'Idioma selecionado', message: option.label, duration: 2500 }),
  }));

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSettings((current) => ({ ...current, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast({ type: 'success', title: 'Configurações salvas', message: 'Suas preferências foram atualizadas.' });
  };

  return (
    <form className="settings" onSubmit={handleSubmit}>
      <fieldset className="settings__group">
        <legend>Receber notificações por</legend>
        <label>
          <input type="checkbox" name="email" checked={settings.email} onChange={handleCheckboxChange} />
          E-mail
        </label>
        <label>
          <input type="checkbox" name="sms" checked={settings.sms} onChange={handleCheckboxChange} />
          SMS
        </label>
        <label>
          <input type="checkbox" name="newsletter" checked={settings.newsletter} onChange={handleCheckboxChange} />
          Newsletter semanal
        </label>
      </fieldset>

      <Dropdown
        label="Idioma"
        options={languageOptions}
        selected={language}
        onSelect={(option) => setLanguage(option.value)}
      />

      <div>
        <button type="submit" className="btn btn--primary">
          Salvar configurações
        </button>
      </div>
    </form>
  );
}

/**
 * Perfil do usuário organizado em Abas.
 * O conteúdo de cada aba é passado como JSX via props.
 */
export default function UserProfile() {
  const tabs = [
    { id: 'overview', label: 'Visão geral', content: <ProfileOverview /> },
    { id: 'orders', label: 'Pedidos', content: <OrderHistory /> },
    { id: 'settings', label: 'Configurações', content: <ProfileSettings /> },
  ];

  return <Tabs tabs={tabs} ariaLabel="Seções do perfil do usuário" />;
}
