import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium Flowers"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/90 via-rose-50/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-rose-600 font-semibold mb-4 tracking-widest uppercase text-sm">
            <Sparkles className="w-4 h-4" />
            Premium Wreath Service
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-dark-gray">
            마음을 전하는 <br />
            <span className="text-rose-600">가장 아름다운</span> 방법
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light">
            꽃파는여인은 10년의 노하우로 가장 신선한 꽃만을 선별하여 <br className="hidden md:block" />
            당신의 소중한 마음을 전국 어디든 3시간 이내에 전달합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOrderClick}
              className="bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 soft-shadow hover:bg-rose-700 transition-all"
            >
              실시간 주문하기
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-rose-600 border-2 border-rose-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-rose-50 transition-all"
            >
              카탈로그 보기
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-10 right-10 hidden lg:block bg-white p-6 rounded-2xl shadow-xl border border-rose-100"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">전국 배송 보장</p>
            <p className="text-xl font-serif font-bold">3시간 이내 도착</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
