import { motion } from 'motion/react';
import { Flower, Phone, Menu, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flower className="text-rose-600 w-8 h-8" />
          <span className="text-2xl font-serif font-bold tracking-tight text-rose-600">
            꽃파는여인
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#" className="hover:text-rose-600 transition-colors">축하화환</a>
          <a href="#" className="hover:text-rose-600 transition-colors">근조화환</a>
          <a href="#" className="hover:text-rose-600 transition-colors">개업화환</a>
          <a href="#" className="hover:text-rose-600 transition-colors">배송안내</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-rose-50 rounded-full transition-colors relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="md:hidden p-2 hover:bg-rose-50 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <a 
            href="tel:1588-0000" 
            className="hidden md:flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-rose-700 transition-all soft-shadow"
          >
            <Phone className="w-4 h-4" />
            1588-0000
          </a>
        </div>
      </div>
    </nav>
  );
}
