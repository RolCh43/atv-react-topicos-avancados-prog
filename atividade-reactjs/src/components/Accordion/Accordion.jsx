import { useId, useState } from 'react';
import './Accordion.css';

/**
 * Acordeão: recebe os itens ({ id, title, content }) via props
 * e controla no state qual item está aberto (apenas um por vez).
 */
export default function Accordion({ items, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  const baseId = useId();

  const handleToggle = (index) => {
    // Clicar no item aberto fecha; clicar em outro abre e fecha o anterior
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.id ?? index} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="accordion__heading">
              <button
                id={headerId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={headerId} className="accordion__panel">
              <div className="accordion__content">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
