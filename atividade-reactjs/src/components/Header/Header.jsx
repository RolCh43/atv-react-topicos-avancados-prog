import { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import './Header.css';

const navLinks = [
  { href: '#produtos', label: 'Produtos' },
  { href: '#upload', label: 'Upload' },
  { href: '#notificacoes', label: 'Notificações' },
  { href: '#perfil', label: 'Perfil' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart(); // estado global do carrinho

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header__inner container">
        <a href="#conteudo" className="header__logo">
          React<span>Store</span>
        </a>

        <nav
          id="menu-principal"
          aria-label="Navegação principal"
          className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__cart">
          <span aria-hidden="true">🛒</span>
          <span className="header__cart-count" aria-live="polite">
            {totalItems}
            <span className="sr-only"> itens no carrinho</span>
          </span>
        </div>

        {/* Botão "hambúrguer" exibido apenas em telas pequenas */}
        <button
          type="button"
          className="header__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="menu-principal"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="header__toggle-bar" aria-hidden="true" />
          <span className="header__toggle-bar" aria-hidden="true" />
          <span className="header__toggle-bar" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
