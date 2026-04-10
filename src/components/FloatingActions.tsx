import { motion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-4">
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#FEE500] text-[#3C1E1E] p-4 rounded-full shadow-xl flex items-center gap-3 font-bold"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden md:block">카톡상담</span>
      </motion.button>
      
      <motion.a
        href="tel:1588-0000"
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="bg-rose-600 text-white p-4 rounded-full shadow-xl flex items-center gap-3 font-bold"
      >
        <Phone className="w-6 h-6 fill-current" />
        <span className="hidden md:block">전화주문</span>
      </motion.a>
    </div>
  );
}
