// Dados fictícios para o catálogo de produtos
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Design moderno e durável.',
  'Sed do eiusmod tempor incididunt ut labore. Ótimo custo-benefício para o dia a dia.',
  'Ut enim ad minim veniam, quis nostrud exercitation. Qualidade premium garantida.',
];

const rawProducts = [
  ['Fone Bluetooth Aurora', 'Eletrônicos', 249.9, '🎧'],
  ['Smartwatch Pulse', 'Eletrônicos', 599.0, '⌚'],
  ['Caixa de Som Boom', 'Eletrônicos', 189.9, '🔊'],
  ['Teclado Mecânico Nova', 'Eletrônicos', 329.9, '⌨️'],
  ['Mouse Sem Fio Glide', 'Eletrônicos', 99.9, '🖱️'],
  ['Webcam HD Vision', 'Eletrônicos', 219.0, '📷'],
  ['JavaScript do Zero', 'Livros', 79.9, '📘'],
  ['Arquitetura de Software Moderna', 'Livros', 119.9, '📗'],
  ['Estruturas de Dados Essenciais', 'Livros', 94.5, '📙'],
  ['Design de Interfaces', 'Livros', 69.9, '📕'],
  ['Engenharia de Requisitos', 'Livros', 88.0, '📓'],
  ['Testes Automatizados na Prática', 'Livros', 99.0, '📔'],
  ['Luminária LED Zen', 'Casa', 139.9, '💡'],
  ['Cafeteira Express', 'Casa', 289.0, '☕'],
  ['Organizador de Mesa', 'Casa', 49.9, '🗂️'],
  ['Vaso com Planta Artificial', 'Casa', 59.9, '🪴'],
  ['Caneca Térmica', 'Casa', 39.9, '🍵'],
  ['Almofada Ergonômica', 'Casa', 119.0, '🛋️'],
  ['Garrafa Térmica Trail', 'Esportes', 89.9, '🥤'],
  ['Tapete de Yoga Flex', 'Esportes', 129.9, '🧘'],
  ['Bola de Futebol Pro', 'Esportes', 149.9, '⚽'],
  ['Mochila Urban', 'Esportes', 199.0, '🎒'],
  ['Kit Halteres 2 kg', 'Esportes', 109.9, '🏋️'],
  ['Bicicleta Infantil', 'Esportes', 459.0, '🚲'],
];

export const products = rawProducts.map(([name, category, price, emoji], index) => ({
  id: index + 1,
  name,
  category,
  price,
  emoji,
  description: descriptions[index % descriptions.length],
}));

export const categories = [...new Set(products.map((product) => product.category))];
