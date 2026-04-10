import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Truck, 
  Camera, 
  Clock, 
  Award, 
  ChevronRight,
  Flower2,
  Ribbon,
  Store
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import { PRODUCTS, REVIEWS } from './constants';
import { Product, Category } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
    
    // Update recently viewed
    const updated = [product, ...recentlyViewed.filter(p => p.id !== product.id)].slice(0, 4);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: '전체보기', icon: <Flower2 className="w-6 h-6" /> },
    { id: 'celebration', name: '축하화환', icon: <Heart className="w-6 h-6" /> },
    { id: 'condolence', name: '근조화환', icon: <Ribbon className="w-6 h-6" /> },
    { id: 'opening', name: '개업화환', icon: <Store className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero onOrderClick={() => {
          setSelectedProduct(PRODUCTS[0]);
          setIsOrderModalOpen(true);
        }} />

        {/* Category Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">어떤 마음을 전하고 싶으신가요?</h2>
              <p className="text-gray-500 font-light">상황에 맞는 최고의 화환을 추천해 드립니다.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-rose-600 text-white shadow-xl shadow-rose-200' 
                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedCategory === cat.id ? 'bg-white/20' : 'bg-white'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className="font-bold text-lg">{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">인기 상품</h2>
                <p className="text-gray-500">가장 많은 분들이 선택하신 베스트 상품입니다.</p>
              </div>
              <button className="text-rose-600 font-bold flex items-center gap-1 hover:underline underline-offset-4">
                전체보기 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onOrder={handleOrder} 
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Trust & Promotion Section */}
        <section className="py-24 bg-dark-gray text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-600/10 blur-3xl rounded-full -mr-20 -mt-20" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                  전국 어디든 <br />
                  <span className="text-rose-600">3시간 이내</span> 배송 보장
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">전국 빠른 배송</h4>
                      <p className="text-sm text-gray-400">전국 2,000여 가맹점을 통해 3시간 이내 배송합니다.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">배송 사진 전송</h4>
                      <p className="text-sm text-gray-400">제작 완료 및 배송 완료 시 실제 사진을 보내드립니다.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">24시간 접수</h4>
                      <p className="text-sm text-gray-400">언제 어디서나 온라인으로 간편하게 주문 가능합니다.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">품질 보장제</h4>
                      <p className="text-sm text-gray-400">신선하지 않은 꽃은 100% 재배송해 드립니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {REVIEWS.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-3xl overflow-hidden aspect-square ${i % 2 === 1 ? 'mt-8' : ''}`}
                    >
                      <img 
                        src={img} 
                        alt="Delivery Review" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-rose-600 p-8 rounded-3xl shadow-2xl">
                  <p className="text-4xl font-serif font-bold mb-1">99%</p>
                  <p className="text-sm font-medium opacity-80">고객 만족도</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-serif font-bold mb-8">최근 본 상품</h3>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {recentlyViewed.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleOrder(product)}
                    className="flex-shrink-0 w-48 group cursor-pointer"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-rose-600 font-bold text-sm">{product.price.toLocaleString()}원</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingActions />
      
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
}
