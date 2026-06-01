import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'login' | 'signup';

interface SocialIconProps {
  type: 'google' | 'facebook' | 'wechat';
  onClick: () => void;
}

const SocialIcon = ({ type, onClick }: SocialIconProps) => {
  const icons = {
    google: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    wechat: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="currentColor" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.858zm-3.855 3.015c.535 0 .969.433.969.968a.968.968 0 0 1-.969.968.968.968 0 0 1-.969-.968.968.968 0 0 1 .969-.968zm4.766 0c.535 0 .969.433.969.968a.968.968 0 0 1-.969.968.968.968 0 0 1-.969-.968.968.968 0 0 1 .969-.968z" />
      </svg>
    ),
  };

  const colors = {
    google: 'hover:text-[#4285F4]',
    facebook: 'hover:text-[#1877F2]',
    wechat: 'hover:text-[#09B83E]',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 ${colors[type]} hover:border-current hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer`}
    >
      {icons[type]}
    </motion.button>
  );
};

interface AuthPanelProps {
  onLogin?: () => void;
}

export const AuthPanel = ({ onLogin }: AuthPanelProps) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.();
  };

  const handleSocialLogin = () => {
    onLogin?.();
  };

  const inputBase = `w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm outline-none transition-all duration-300`;
  const inputFocused = `border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] ring-2 ring-white/30 bg-white/10`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-sm"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        style={{
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-emerald-300/5 to-white/10 opacity-40 blur-sm -z-10 rounded-[16px]" />

        {/* Brand label */}
        <div className="text-center mb-4">
          <p className="text-emerald-300/70 text-xs tracking-[0.2em] uppercase">Veu Travel</p>
          <h2 className="text-white text-xl font-bold mt-1">
            {mode === 'login' ? 'Welcome Back' : 'Start Your Journey'}
          </h2>
        </div>

        {/* Toggle Switch */}
        <div className="relative flex items-center justify-center mb-4 bg-white/5 rounded-full p-1 border border-white/10">
          <motion.div
            className="absolute top-1 bottom-1 left-1 right-1/2 bg-gradient-to-r from-white/30 to-emerald-300/30 rounded-full shadow-lg"
            animate={{ x: mode === 'login' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setMode('login')}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${mode === 'login' ? 'text-white' : 'text-white/60'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${mode === 'signup' ? 'text-white' : 'text-white/60'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {mode === 'signup' && (
                <div>
                  <label className="text-white/90 text-sm mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      className={`${inputBase} pl-11 ${focusedField === 'fullName' ? inputFocused : ''}`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-white/90 text-sm mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className={`${inputBase} pl-11 ${focusedField === 'email' ? inputFocused : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="text-white/90 text-sm mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your password"
                    className={`${inputBase} pl-11 pr-11 ${focusedField === 'password' ? inputFocused : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-white/90 text-sm mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Confirm your password"
                      className={`${inputBase} pl-11 pr-11 ${focusedField === 'confirmPassword' ? inputFocused : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-sm text-white/80">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-10 bg-gradient-to-r from-white/90 to-emerald-300/80 hover:from-white hover:to-emerald-300 text-gray-900 font-semibold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer text-sm"
          >
            {mode === 'login' ? 'Continue' : 'Get Started'}
          </motion.button>

          {/* Social Login */}
          <div className="pt-1">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-transparent px-4 text-white/60">Or continue with</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <SocialIcon type="google" onClick={handleSocialLogin} />
              <SocialIcon type="facebook" onClick={handleSocialLogin} />
              <SocialIcon type="wechat" onClick={handleSocialLogin} />
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
