import './ProductCard.css';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * Card de produto. Recebe o produto e o callback onAddToCart via props.
 */
export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__image" aria-hidden="true">
        {product.emoji}
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <strong className="product-card__price">{currency.format(product.price)}</strong>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => onAddToCart(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
