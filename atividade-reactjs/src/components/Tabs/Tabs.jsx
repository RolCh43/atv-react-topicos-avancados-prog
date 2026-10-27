import { useId, useRef, useState } from 'react';
import './Tabs.css';

/**
 * Abas: recebe as abas ({ id, label, content }) via props e guarda
 * no state qual aba está ativa. Suporta navegação por teclado
 * (setas ←/→, Home e End), conforme o padrão WAI-ARIA.
 */
export default function Tabs({ tabs, defaultIndex = 0, ariaLabel, onChange }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabRefs = useRef([]);
  const baseId = useId();

  const selectTab = (index) => {
    setActiveIndex(index);
    onChange?.(tabs[index]);
  };

  const handleKeyDown = (event, index) => {
    let newIndex;
    switch (event.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTab(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label={ariaLabel} className="tabs__list">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              className="tabs__tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          className="tabs__panel"
          hidden={index !== activeIndex}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
