import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, MapPin, Type, Phone, CheckCircle2 } from 'lucide-react';
import { Product, OrderFormData } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<OrderFormData>({
    receiverName: '',
    address: '',
    ribbonLeft: '',
    ribbonRight: '',
    deliveryDate: '',
    deliveryTime: '',
    senderPhone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isShaking, setIsShaking] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    if (!formData.receiverName) newErrors.receiverName = '받는 분 성함을 입력해주세요.';
    if (!formData.address) newErrors.address = '배송지 주소를 입력해주세요.';
    if (!formData.senderPhone) newErrors.senderPhone = '연락처를 입력해주세요.';
    if (!formData.deliveryDate) newErrors.deliveryDate = '배송 날짜를 선택해주세요.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('success');
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark-gray/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-rose-50 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          {step === 'form' ? (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
              {/* Product Info Sidebar */}
              <div className="md:w-1/3 bg-rose-50 p-8 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img 
                    src={product?.image} 
                    alt={product?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2">{product?.name}</h3>
                <p className="text-rose-600 font-bold text-lg mb-4">
                  {product?.price.toLocaleString()}원
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• 전국 3시간 이내 배송</p>
                  <p>• 리본 문구 무료 서비스</p>
                  <p>• 배송 사진 전송 서비스</p>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="md:w-2/3 p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">주문 정보 입력</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <User className="w-3 h-3 text-rose-600" /> 받는 분 성함
                      </label>
                      <input 
                        type="text"
                        value={formData.receiverName}
                        onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${errors.receiverName ? 'border-red-400 bg-red-50' : 'border-rose-100 focus:border-rose-600'}`}
                        placeholder="홍길동"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <Phone className="w-3 h-3 text-rose-600" /> 연락처
                      </label>
                      <input 
                        type="tel"
                        value={formData.senderPhone}
                        onChange={(e) => setFormData({...formData, senderPhone: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${errors.senderPhone ? 'border-red-400 bg-red-50' : 'border-rose-100 focus:border-rose-600'}`}
                        placeholder="010-0000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-600" /> 배송지 주소
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        readOnly
                        value={formData.address}
                        className={`flex-1 px-4 py-2.5 rounded-xl border-2 border-rose-100 bg-gray-50 outline-none ${errors.address ? 'border-red-400' : ''}`}
                        placeholder="주소 검색을 이용해주세요"
                      />
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, address: '서울시 강남구 테헤란로 123'})}
                        className="bg-dark-gray text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors"
                      >
                        검색
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <Type className="w-3 h-3 text-rose-600" /> 리본 문구 (좌)
                      </label>
                      <input 
                        type="text"
                        value={formData.ribbonLeft}
                        onChange={(e) => setFormData({...formData, ribbonLeft: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-rose-100 focus:border-rose-600 outline-none transition-all"
                        placeholder="보내는 분 (예: 홍길동)"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <Type className="w-3 h-3 text-rose-600" /> 리본 문구 (우)
                      </label>
                      <input 
                        type="text"
                        value={formData.ribbonRight}
                        onChange={(e) => setFormData({...formData, ribbonRight: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-rose-100 focus:border-rose-600 outline-none transition-all"
                        placeholder="축하 문구 (예: 축하합니다)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-600" /> 배송 날짜
                      </label>
                      <input 
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${errors.deliveryDate ? 'border-red-400 bg-red-50' : 'border-rose-100 focus:border-rose-600'}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-600" /> 배송 시간
                      </label>
                      <select 
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-rose-100 focus:border-rose-600 outline-none transition-all bg-white"
                      >
                        <option value="">시간 선택</option>
                        <option value="09:00">09:00 ~ 11:00</option>
                        <option value="11:00">11:00 ~ 13:00</option>
                        <option value="13:00">13:00 ~ 15:00</option>
                        <option value="15:00">15:00 ~ 17:00</option>
                        <option value="17:00">17:00 ~ 19:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t pt-6">
                  <div>
                    <p className="text-xs text-gray-500">최종 결제 금액</p>
                    <p className="text-2xl font-bold text-rose-600">{product?.price.toLocaleString()}원</p>
                  </div>
                  <button 
                    type="submit"
                    className="bg-rose-600 text-white px-10 py-3.5 rounded-2xl font-bold text-lg hover:bg-rose-700 transition-all soft-shadow"
                  >
                    주문하기
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold mb-4">주문이 완료되었습니다!</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                소중한 마음을 담아 정성껏 제작하겠습니다. <br />
                배송이 시작되면 사진과 함께 알림톡을 보내드립니다.
              </p>
              <div className="bg-rose-50 p-6 rounded-2xl mb-8 text-left max-w-sm mx-auto">
                <p className="text-sm font-bold mb-2 border-bottom border-rose-200 pb-2">주문 요약</p>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between"><span>상품명</span> <span className="font-medium">{product?.name}</span></p>
                  <p className="flex justify-between"><span>받는분</span> <span className="font-medium">{formData.receiverName}</span></p>
                  <p className="flex justify-between"><span>배송일</span> <span className="font-medium">{formData.deliveryDate}</span></p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="bg-rose-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-rose-700 transition-all soft-shadow"
              >
                확인
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
