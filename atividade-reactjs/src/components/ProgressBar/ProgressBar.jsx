import { useId } from 'react';
import './ProgressBar.css';

/**
 * Barra de progresso: recebe o valor (0-100) via props
 * e atualiza a largura do preenchimento com base nele.
 */
export default function ProgressBar({ value, label = 'Progresso', showPercentage = true, animated = false }) {
  const labelId = useId();
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0)); // garante 0-100
  const rounded = Math.round(safeValue);

  const classes = ['progress', rounded === 100 && 'progress--complete', animated && 'progress--animated']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="progress__header">
        <span id={labelId}>{label}</span>
        {showPercentage && <span aria-hidden="true">{rounded}%</span>}
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
      >
        <div className="progress__fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
