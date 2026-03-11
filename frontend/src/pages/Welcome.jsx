import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, Globe2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  const handleAction = (mode) => {
    if (user) {
      navigate('/donate');
    } else {
      setAuthMode(mode);
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-700"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8 backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 relative"></span>
            Reducing Food Waste Globally
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Share food. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Save the planet.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Shario bridges the gap between surplus food and those who need it. 
            A single platform to easily donate your extra food or find a meal nearby.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => handleAction('signup')} 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Start Donating <Heart fill="currentColor" size={20} />
            </button>
            <Link 
              to="/find-food" 
              className="glass-panel hover:bg-slate-800/80 text-white px-8 py-4 justify-center rounded-full font-bold text-lg border border-slate-700 hover:border-slate-500 transition-all w-full sm:w-auto flex items-center gap-2 shadow-lg"
            >
              Find Food Nearby <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl hover:bg-slate-800/50 transition-all hover:-translate-y-2 border border-slate-700/50 group">
            <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <Globe2 size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Smart Nearby Sorting</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Find exactly what you need quickly. Our intelligent geolocation ranks available food by closest distance to you.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:bg-slate-800/50 transition-all hover:-translate-y-2 border border-slate-700/50 group">
            <div className="h-14 w-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Single Unified Account</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              No complex roles. You can both donate your surplus and receive food all from one single verified profile.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:bg-slate-800/50 transition-all hover:-translate-y-2 border border-slate-700/50 group">
            <div className="h-14 w-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Real-time Updates</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              View active donations mapped out in real-time, complete with expiry times and precise pickup locations.
            </p>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default Welcome;
