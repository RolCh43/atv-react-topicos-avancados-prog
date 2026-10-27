import { useMemo, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { products, categories } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './ProductCatalog.css';

const ITEMS_PER_PAGE = 6;

const sortOptions = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name', label: 'Nome (A–Z)' },
];

const categoryOptions = [
  { value: 'all', label: 'Todas as categorias' },
  ...categories.map((category) => ({ value: category, label: category })),
];

/**
 * Catálogo: combina Menu Suspenso (filtro/ordenação) + Paginação.
 */
export default function ProductCatalog() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const catalogRef = useRef(null);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Filtra e ordena apenas quando categoria ou ordenação mudam
  const filteredProducts = useMemo(() => {
    const list = category === 'all' ? [...products] : products.filter((p) => p.category === category);

    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
      default:
        return list;
    }
  }, [category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (option) => {
    setCategory(option.value);
    setCurrentPage(1); // volta para a 1ª página ao trocar o filtro
  };

  const handleSortChange = (option) => {
    setSortBy(option.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast({
      type: 'success',
      title: 'Produto adicionado',
      message: `"${product.name}" foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="catalog" ref={catalogRef}>
      <div className="catalog__toolbar">
        <Dropdown label="Categoria" options={categoryOptions} selected={category} onSelect={handleCategoryChange} />
        <Dropdown label="Ordenar por" options={sortOptions} selected={sortBy} onSelect={handleSortChange} />
        <p className="catalog__count" aria-live="polite">
          {filteredProducts.length} produto(s) encontrado(s)
        </p>
      </div>

      <ul className="catalog__grid">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </li>
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        ariaLabel="Paginação do catálogo"
      />
    </div>
  );
}
