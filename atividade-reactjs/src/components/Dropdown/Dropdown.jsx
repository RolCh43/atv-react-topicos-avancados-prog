import { useEffect, useId, useRef, useState } from 'react';
import './Dropdown.css';

/**
 * Menu suspenso: controla a visibilidade da lista no state e recebe
 * as opções via props. Cada opção pode ter seu próprio callback (onClick),
 * além do callback geral onSelect.
 * Fecha ao selecionar, ao clicar fora ou ao pressionar Esc.
 */
export default function Dropdown({ label, options, selected, onSelect, placeholder = 'Selecione uma opção' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const triggerId = `${baseId}-trigger`;
  const listId = `${baseId}-list`;

  const selectedIndex = options.findIndex((option) => option.value === selected);
  const selectedOption = options[selectedIndex];

  // useEffect: registra o listener de "clique fora" apenas enquanto o menu está aberto
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const openMenu = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  const handleSelect = (option) => {
    option.onClick?.(option); // callback específico da opção (se houver)
    onSelect?.(option); // callback geral do componente
    closeMenu();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) openMenu();
        else setActiveIndex((index) => (index + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) openMenu();
        else setActiveIndex((index) => (index - 1 + options.length) % options.length);
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && activeIndex >= 0) handleSelect(options[activeIndex]);
        else if (!isOpen) openMenu();
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeMenu();
        }
        break;
      case 'Tab':
        closeMenu();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`dropdown ${isOpen ? 'is-open' : ''}`}>
      <span id={labelId} className="dropdown__label">
        {label}
      </span>

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        className="dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-labelledby={`${labelId} ${triggerId}`}
        aria-activedescendant={isOpen && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        onKeyUp={(event) => event.key === ' ' && event.preventDefault()}
      >
        <span className="dropdown__value">{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="dropdown__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul id={listId} role="listbox" aria-labelledby={labelId} className="dropdown__menu">
          {options.map((option, index) => {
            const isSelected = option.value === selected;
            const classes = ['dropdown__option', index === activeIndex && 'is-active', isSelected && 'is-selected']
              .filter(Boolean)
              .join(' ');

            return (
              <li
                key={option.value}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={classes}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
                {isSelected && <span aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
