import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Loader2, CheckCircle, CreditCard, Paypal, DollarSign } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Calculate total whenever cart updates
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  }, [items]);

  // Handle keyboard "Escape" to close cart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Simulate checkout process
  const handleCheckout = () => {
    if (items.length === 0) return; // Prevent checkout on empty cart
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      clearCart(); // Empty cart after successful checkout

      setTimeout(() => {
        setCheckoutSuccess(false);
        setIsOpen(false);
      }, 2000); // Auto-close after success
    }, 2000); // Simulated 2-second processing
  };

  return (
    <>
      {/* Cart Button */}
      <button 
        className="relative group" 
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingBag className="text-purple-800 cursor-pointer w-6 h-6 transition-transform group-hover:scale-110" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-800 text-yellow-400 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {items.length}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="h-full w-96 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-purple-800">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                <X className="w-6 h-6 text-purple-800" />
              </button>
            </div>

            {/* Checkout Success Message */}
            {checkoutSuccess ? (
              <div className="flex flex-col items-center text-center text-green-600">
                <CheckCircle className="w-12 h-12 mb-2" />
                <p className="text-lg font-semibold">Payment Successful!</p>
                <p className="text-sm text-gray-500">Paid with {paymentMethod.replace("_", " ")}</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div key={item.product.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-md"
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
                                className="border px-2 py-1 text-xs rounded disabled:opacity-50"
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity === 1}
                              >
                                -
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button
                                className="border px-2 py-1 text-xs rounded"
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
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-6">Your cart is empty</p>
                  )}
                </div>

                {/* Payment Method Selection */}
                {items.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-sm mb-2">Select Payment Method:</h3>
                    <div className="flex gap-2">
                      <button
                        className={`border flex items-center gap-2 p-2 w-full rounded-md ${
                          paymentMethod === "credit_card" ? "bg-purple-800 text-white" : ""
                        }`}
                        onClick={() => setPaymentMethod("credit_card")}
                      >
                        <CreditCard className="w-4 h-4" />
                        Credit Card
                      </button>
                      <button
                        className={`border flex items-center gap-2 p-2 w-full rounded-md ${
                          paymentMethod === "paypal" ? "bg-purple-800 text-white" : ""
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <Paypal className="w-4 h-4" />
                        PayPal
                      </button>
                      <button
                        className={`border flex items-center gap-2 p-2 w-full rounded-md ${
                          paymentMethod === "google_pay" ? "bg-purple-800 text-white" : ""
                        }`}
                        onClick={() => setPaymentMethod("google_pay")}
                      >
                        <DollarSign className="w-4 h-4" />
                        Google Pay
                      </button>
                    </div>

                    {/* Cart Total & Checkout */}
                    <div className="flex justify-between mt-4">
                      <span className="font-bold text-sm">Total:</span>
                      <span className="font-bold text-sm">${total.toFixed(2)}</span>
                    </div>

                    <button 
                      className="w-full bg-purple-800 text-white px-4 py-2 mt-4 rounded-md flex justify-center items-center"
                      onClick={handleCheckout}
                      disabled={isProcessing || items.length === 0}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...
                        </>
                      ) : (
                        `PAY WITH ${paymentMethod.toUpperCase().replace("_", " ")}`
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
