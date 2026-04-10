import { Flower, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Flower className="text-rose-600 w-8 h-8" />
              <span className="text-2xl font-serif font-bold text-rose-600">꽃파는여인</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6 font-light">
              마음을 전하는 가장 아름다운 방법. <br />
              꽃파는여인은 당신의 소중한 순간을 <br />
              더욱 빛나게 만듭니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-600">
              <li><a href="#" className="hover:text-rose-600 transition-colors">축하화환</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">근조화환</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">개업화환</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Customer Center</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-600" />
                <span className="font-bold text-xl">1588-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-600" />
                <span>help@flowerwoman.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>서울시 강남구 꽃길 123</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Business Info</h4>
            <div className="text-sm text-gray-500 space-y-2 leading-relaxed">
              <p>상호명: (주)꽃파는여인</p>
              <p>대표자: 김꽃님</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 제2024-서울강남-0000호</p>
              <p>개인정보보호책임자: 이장미</p>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Flower Selling Woman. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-rose-600">Terms of Service</a>
            <a href="#" className="hover:text-rose-600">Privacy Policy</a>
            <a href="#" className="hover:text-rose-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
