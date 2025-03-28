import React from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';

interface ProductGridProps {
  gender: 'men' | 'women';
  category?: string;
}

export function ProductGrid({ gender, category }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(category || 'all');
  
  const categories = ['all', ...new Set(products
    .filter(product => product.gender === gender)
    .map(product => product.category))];

  const filteredProducts = products
    .filter(product => product.gender === gender)
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory);

  return (
    <div>
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pixel-button px-4 py-2 text-xs whitespace-nowrap
                      ${selectedCategory === cat ? 'bg-purple-800 text-yellow-400' : ''}`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}