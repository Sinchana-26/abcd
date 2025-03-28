import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Cart() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <>
      <button 
        className="relative group"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="text-purple-800 cursor-pointer w-6 h-6 
                              transition-transform group-hover:scale-110" />
        <span className="absolute -top-2 -right-2 bg-purple-800 text-yellow-400 
                       text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {items.length}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-purple-800">Your Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-purple-800" />
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="pixel-card p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-purple-800">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="pixel-button px-2 py-1 text-xs"
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          className="pixel-button px-2 py-1 text-xs"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 ? (
              <div className="mt-6">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-sm">Total:</span>
                  <span className="font-bold text-sm">${total.toFixed(2)}</span>
                </div>
                <button className="pixel-button w-full">
                  CHECKOUT
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">Your cart is empty</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}