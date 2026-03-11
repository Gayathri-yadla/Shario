import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-panel border-b border-emerald-500/20 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Leaf className="h-8 w-8 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-2xl tracking-tight text-white">Shario</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/find-food" className="nav-link">Find Food</Link>
              
              {user ? (
                <>
                  <Link to="/donate" className="nav-link text-emerald-400 font-semibold">Donate Food</Link>
                  <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
                    <span className="text-slate-300 flex items-center gap-2">
                      <UserIcon size={18} /> {user.name}
                    </span>
                    <button onClick={logout} className="text-slate-400 hover:text-red-400 transition-colors">
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
                  <button onClick={() => openAuth('login')} className="text-slate-300 hover:text-white font-medium transition-colors">
                    Log in
                  </button>
                  <button onClick={() => openAuth('signup')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-emerald-500/20">
                    Sign up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-panel border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/find-food" onClick={() => setIsOpen(false)} className="block px-3 py-2 nav-link">Find Food</Link>
              
              {user ? (
                <>
                  <Link to="/donate" onClick={() => setIsOpen(false)} className="block px-3 py-2 nav-link text-emerald-400">Donate Food</Link>
                  <div className="px-3 py-2 text-slate-400 border-t border-slate-800 mt-2">
                    Signed in as {user.name}
                  </div>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300">
                    Log out
                  </button>
                </>
              ) : (
                <div className="border-t border-slate-800 mt-2 pt-2 px-3 space-y-2">
                  <button onClick={() => openAuth('login')} className="block w-full btn-secondary">Log in</button>
                  <button onClick={() => openAuth('signup')} className="block w-full btn-primary">Sign up</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};

export default Navbar;
