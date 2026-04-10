import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onOrder: (product: Product) => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden soft-shadow border border-rose-50 transition-all"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isBest && (
          <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            BEST
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onOrder(product)}
            className="bg-white text-rose-600 p-4 rounded-full shadow-xl hover:bg-rose-600 hover:text-white transition-all"
          >
            <ShoppingCart className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-rose-600 font-medium mb-1 uppercase tracking-wider">
          {product.category === 'celebration' ? '축하화환' : product.category === 'condolence' ? '근조화환' : '개업화환'}
        </p>
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-dark-gray">
            {product.price.toLocaleString()}
            <span className="text-sm font-normal ml-1 text-gray-500">원</span>
          </p>
          <button 
            onClick={() => onOrder(product)}
            className="text-sm font-bold text-rose-600 hover:underline underline-offset-4"
          >
            상세보기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
