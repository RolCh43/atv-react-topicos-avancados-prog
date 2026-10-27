import './Pagination.css';

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Gera a lista de páginas a exibir, usando "..." quando há muitas páginas.
 * Ex.: [1, 'dots-left', 4, 5, 6, 'dots-right', 10]
 */
function getPageItems(currentPage, totalPages, siblingCount) {
  const maxVisible = siblingCount * 2 + 5; // primeira, última, atual e 2 reticências
  if (totalPages <= maxVisible) return range(1, totalPages);

  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);
  const showLeftDots = left > 3;
  const showRightDots = right < totalPages - 2;
  const edgeCount = 3 + siblingCount * 2;

  if (!showLeftDots && showRightDots) return [...range(1, edgeCount), 'dots-right', totalPages];
  if (showLeftDots && !showRightDots) return [1, 'dots-left', ...range(totalPages - edgeCount + 1, totalPages)];
  return [1, 'dots-left', ...range(left, right), 'dots-right', totalPages];
}

/**
 * Paginação: recebe o total de páginas, a página atual e um callback
 * (onPageChange) via props. Não guarda estado próprio (componente controlado).
 */
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  ariaLabel = 'Paginação',
}) {
  const pageItems = getPageItems(currentPage, totalPages, siblingCount);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav className="pagination" aria-label={ariaLabel}>
      <ul className="pagination__list">
        <li>
          <button
            type="button"
            className="pagination__button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="Ir para a página anterior"
          >
            <span aria-hidden="true">‹</span>
            <span className="pagination__label">Anterior</span>
          </button>
        </li>

        {pageItems.map((item) =>
          typeof item === 'string' ? (
            <li key={item} className="pagination__hide-mobile" aria-hidden="true">
              <span className="pagination__ellipsis">…</span>
            </li>
          ) : (
            <li key={item} className={item === currentPage ? '' : 'pagination__hide-mobile'}>
              <button
                type="button"
                className="pagination__button"
                onClick={() => goToPage(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Página ${item}`}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className="pagination__button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={isLastPage}
            aria-label="Ir para a próxima página"
          >
            <span className="pagination__label">Próxima</span>
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>

      <p className="pagination__info" aria-live="polite">
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  );
}
