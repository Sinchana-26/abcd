import React from 'react';
import { Star, Zap, TrendingUp } from 'lucide-react';
import { Cart } from './components/Cart';
import { ProductGrid } from './components/ProductGrid';
import { Carousel } from './components/Carousel';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [activeSection, setActiveSection] = React.useState<'men' | 'women'>('men');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-50">
      <nav className="bg-white p-4 border-b-4 border-indigo-200 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            to="/"
            className="text-2xl font-bold text-indigo-900 tracking-wider"
          >
            RETRO•FITS
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              to="/men"
              className={`nav-link text-sm ${location.pathname === '/men' ? 'after:scale-x-100' : ''}`}
              onClick={() => setActiveSection('men')}
            >
              MEN
            </Link>
            <Link 
              to="/women"
              className={`nav-link text-sm ${location.pathname === '/women' ? 'after:scale-x-100' : ''}`}
              onClick={() => setActiveSection('women')}
            >
              WOMEN
            </Link>
            <Cart />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={
            <>
              <Carousel onShopNow={() => navigate('/men')} />
              <div className="mt-16 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { Icon: Star, title: "Authentic Vintage", desc: "Hand-picked genuine items" },
                    { Icon: Zap, title: "Fast Shipping", desc: "Worldwide delivery" },
                    { Icon: TrendingUp, title: "Weekly Drops", desc: "New arrivals every week" }
                  ].map((feature, index) => (
                    <div key={index} 
                         className="flex items-center gap-4 pixel-card p-4 hover:translate-y-[-4px] transition-transform">
                      <feature.Icon className="text-pink-500 w-8 h-8" />
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">{feature.title}</h4>
                        <p className="text-indigo-600 text-xs mt-2">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          } />
          <Route path="/men" element={
            <div className="mt-8 mb-16">
              <h3 className="text-2xl font-bold text-indigo-900 mb-8 tracking-wide">
                MEN'S COLLECTION
              </h3>
              <ProductGrid gender="men" />
            </div>
          } />
          <Route path="/women" element={
            <div className="mt-8 mb-16">
              <h3 className="text-2xl font-bold text-indigo-900 mb-8 tracking-wide">
                WOMEN'S COLLECTION
              </h3>
              <ProductGrid gender="women" />
            </div>
          } />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 border-t-4 border-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4 text-sm">RETRO•FITS</h5>
              <p className="text-xs text-indigo-200">Your destination for authentic 90's fashion</p>
            </div>
            {[
              {
                title: "Shop",
                links: ["New Arrivals", "Trending", "Collections", "Sale"]
              },
              {
                title: "Help",
                links: ["FAQs", "Shipping", "Returns", "Contact"]
              },
              {
                title: "Connect",
                links: ["Instagram", "Twitter", "Facebook", "TikTok"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h5 className="font-bold mb-4 text-sm">{section.title}</h5>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="text-xs text-indigo-200 hover:text-pink-500 
                                       transition-colors tracking-wide">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;