import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Leaf className="h-5 w-5 text-emerald-500" />
          <span>© {new Date().getFullYear()} Shario. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
