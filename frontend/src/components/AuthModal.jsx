import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon, CheckCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register, verifyOTP } = useContext(AuthContext);
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'otp'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError('');
    setFormData({ name: '', email: '', password: '', otp: '' });
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
        onClose();
      } else if (mode === 'signup') {
        const res = await register({ name: formData.name, email: formData.email, password: formData.password });
        if (res.email) setMode('otp');
      } else if (mode === 'otp') {
        await verifyOTP({ email: formData.email, otp: formData.otp });
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      if (err.response?.status === 401 && err.response?.data?.message.includes('verify')) {
        setMode('otp');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify Email'}
          </h2>
          <p className="text-slate-400 mb-8">
            {mode === 'login' ? 'Sign in to continue sharing.' : mode === 'signup' ? 'Join the community to reduce waste.' : 'Enter the OTP sent to your email.'}
          </p>

          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-6 text-sm flex items-center gap-2"><X size={16}/> {error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-slate-500" size={20} />
                <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="input-field pl-10" />
              </div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
                  <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="input-field pl-10" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
                  <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="input-field pl-10" />
                </div>
              </>
            )}

            {mode === 'otp' && (
              <div className="relative">
                <CheckCircle className="absolute left-3 top-3 text-slate-500" size={20} />
                <input type="text" name="otp" placeholder="4-Digit OTP" required maxLength="4" value={formData.otp} onChange={handleChange} className="input-field pl-10 text-center tracking-widest text-lg font-bold" />
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary mt-2 flex justify-center items-center h-12">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : (mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Verify')}
            </button>
          </form>

          {mode !== 'otp' && (
            <div className="mt-6 text-center text-sm text-slate-400">
              {mode === 'login' ? (
                <>Don't have an account? <button onClick={() => setMode('signup')} className="text-emerald-400 hover:text-emerald-300 font-medium">Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => setMode('login')} className="text-emerald-400 hover:text-emerald-300 font-medium">Log in</button></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
