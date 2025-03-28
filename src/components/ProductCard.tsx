import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showDetails, setShowDetails] = React.useState(false);
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="pixel-card group relative">
      <img 
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
      />
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-purple-800">{product.name}</h4>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-purple-800 hover:text-purple-600"
          >
            <Info size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        
        {showDetails && (
          <div className="mt-2 text-xs text-gray-600">
            <p>{product.description}</p>
            <p className="mt-1">Category: {product.category}</p>
          </div>
        )}
        
        <button 
          onClick={() => {
            addItem(product);
            setShowDetails(false);
          }}
          className="pixel-button mt-4 w-full text-xs py-2"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}