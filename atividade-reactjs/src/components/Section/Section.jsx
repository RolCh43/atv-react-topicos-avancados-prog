import './Section.css';

/**
 * Wrapper semântico reutilizável para as seções da página.
 * Recebe título, descrição e o conteúdo (children) via props.
 */
export default function Section({ id, title, description, children }) {
  const headingId = `${id}-titulo`;

  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <header className="section__header">
        <h2 id={headingId}>{title}</h2>
        {description && <p>{description}</p>}
      </header>
      {children}
    </section>
  );
}
