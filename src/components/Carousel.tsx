import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80",
    title: "90'S VIBES",
    subtitle: "BRINGING BACK THE RADICAL STYLE"
  },
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=80",
    title: "RETRO FITS",
    subtitle: "AUTHENTIC VINTAGE COLLECTION"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=80",
    title: "NEON DREAMS",
    subtitle: "BOLD COLORS, BOLD STATEMENTS"
  }
];

interface CarouselProps {
  onShopNow: () => void;
}

export function Carousel({ onShopNow }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="relative h-[500px] mt-8 pixel-card overflow-hidden group">
      <div 
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img 
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-transparent flex items-center">
              <div className="ml-12">
                <div className="relative">
                  <h2 className="text-4xl font-bold text-pink-500 mb-4 tracking-widest animate-[float_4s_ease-in-out_infinite]">
                    {item.title}
                  </h2>
                  <span className="absolute -right-4 top-0 h-4 w-4 bg-pink-500 animate-[blink_1s_steps(1)_infinite]"></span>
                </div>
                <p className="text-white text-sm mb-8 tracking-wide">{item.subtitle}</p>
                <button 
                  className="pixel-button"
                  onClick={onShopNow}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 pixel-button !p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 pixel-button !p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}