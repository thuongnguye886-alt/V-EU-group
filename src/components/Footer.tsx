import React from "react";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Globe2,
  Lock,
  Heart,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "🪙" },
    { name: "Amex", icon: "💎" },
    { name: "JCB", icon: "🌐" },
    { name: "UnionPay", icon: "🏦" },
    { name: "Discover", icon: "🔍" },
    { name: "Diners Club", icon: "🍽️" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Google Pay", icon: "🔋" },
    { name: "PayPal", icon: "🅿️" }
  ];

  return (
    <footer className="w-full bg-[#030612] border-t border-white/5 py-16 px-4 sm:px-8 relative z-30 overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          
          {/* Logo & Intro Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Globe2 className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
                V-EU TRAVEL GROUP
              </span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Sứ mệnh của Tập đoàn V-EU là ứng dụng công nghệ tiên tiến để kết nối con người với những trải nghiệm du lịch giá trị, góp phần quảng bá văn hóa, thiên nhiên và thúc đẩy sự phát triển bền vững của ngành du lịch. Chúng tôi không ngừng đổi mới để tạo ra hệ sinh thái số toàn diện, mang đến những giải pháp thông minh, tiện ích và khác biệt cho khách hàng trên toàn cầu.
            </p>

            {/* Social Network Icons with beautiful interactive effects */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#twitter" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#instagram" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 flex items-center justify-center text-gray-400 hover:text-rose-400 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#youtube" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="#linkedin" 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-all duration-300"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links structure */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Column 1: V-EU TRAVEL */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-cyan-500 pl-2.5 font-mono">
                Về V-EU Travel
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-cyan-300 text-xs transition-colors duration-200 block">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-cyan-300 text-xs transition-colors duration-200 block">
                    Klook Blog / Tin tức
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-cyan-300 text-xs transition-colors duration-200 block">
                    Cơ hội nghề nghiệp
                  </a>
                </li>
                <li>
                  <a href="#gift" className="text-gray-400 hover:text-cyan-300 text-xs transition-colors duration-200 block">
                    Thẻ quà tặng du lịch
                  </a>
                </li>
                <li>
                  <a href="#sustainable" className="text-gray-400 hover:text-cyan-300 text-xs transition-colors duration-200 block">
                    Du lịch bền vững
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Đối Tác */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-purple-500 pl-2.5 font-mono">
                Đối Tác
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#supplier" className="text-gray-400 hover:text-purple-300 text-xs transition-colors duration-200 block">
                    Đăng ký nhà cung cấp
                  </a>
                </li>
                <li>
                  <a href="#login" className="text-gray-400 hover:text-purple-300 text-xs transition-colors duration-200 block">
                    Đối tác đăng nhập
                  </a>
                </li>
                <li>
                  <a href="#affiliate" className="text-gray-400 hover:text-purple-300 text-xs transition-colors duration-200 block">
                    Đối tác liên kết
                  </a>
                </li>
                <li>
                  <a href="#influencer" className="text-gray-400 hover:text-purple-300 text-xs transition-colors duration-200 block">
                    Chương trình Kol & KOC
                  </a>
                </li>
                <li>
                  <a href="#agent" className="text-gray-400 hover:text-purple-300 text-xs transition-colors duration-200 block">
                    Chương trình đại lý
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Điều Khoản */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-amber-500 pl-2.5 font-mono">
                Điều Khoản
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#terms" className="text-gray-400 hover:text-amber-300 text-xs transition-colors duration-200 block">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-amber-300 text-xs transition-colors duration-200 block">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-gray-400 hover:text-amber-300 text-xs transition-colors duration-200 block">
                    Chính sách Cookie
                  </a>
                </li>
                <li>
                  <a href="#rules" className="text-gray-400 hover:text-amber-300 text-xs transition-colors duration-200 block">
                    Chính sách & Quy định
                  </a>
                </li>
                <li>
                  <a href="#welfare" className="text-gray-400 hover:text-amber-300 text-xs transition-colors duration-200 block">
                    Bảo tồn phúc lợi động vật
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Kênh Thanh Toán */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-rose-500 pl-2.5 font-mono">
                Kênh Thanh Toán
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Hỗ trợ đa phương thức bảo mật quốc tế:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">💳</span>
                  <span>VISA</span>
                </div>
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">🪙</span>
                  <span>MasterCard</span>
                </div>
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">💎</span>
                  <span>AMEX</span>
                </div>
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">🌐</span>
                  <span>JCB</span>
                </div>
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">🏦</span>
                  <span>Apple Pay</span>
                </div>
                <div className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors text-[10px] text-gray-300 font-medium select-none">
                  <span className="text-xs">🅿️</span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Deep Base Copyright Area */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>© 2026 V-EU GROUP Co., Ltd. All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-slate-800 hidden sm:inline-block" />
            <span className="hidden sm:inline-block">Product code: WanderVerse Web</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mã hóa bảo mật thông tin SSL 256-bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
