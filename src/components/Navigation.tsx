import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

export function Navigation({ scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-xl z-50">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center h-28">
          <button onClick={() => scrollToSection('accueil')} className="group text-3xl font-serif italic flex items-center gap-2">
            <span className="group-hover:text-[#E8B4A0] transition-colors">Suzy Sourires</span>
            <span className="text-2xl group-hover:scale-125 transition-transform">😊</span>
          </button>

          <div className="hidden lg:flex items-center gap-16">
            <button onClick={() => scrollToSection('services')} className="text-sm hover:opacity-60 transition-opacity">
              Services
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-sm hover:opacity-60 transition-opacity">
              Produits
            </button>
            <button onClick={() => scrollToSection('apropos')} className="text-sm hover:opacity-60 transition-opacity">
              À propos
            </button>
            <a href="tel:0781324474" className="text-sm bg-[#2D2A26] text-white px-8 py-4 rounded-full hover:scale-105 transition-transform">
              Nous contacter
            </a>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-t border-black/5">
          <div className="px-8 py-12 space-y-8">
            <button onClick={() => scrollToSection('services')} className="block text-lg hover:opacity-60 transition-opacity">
              Services
            </button>
            <button onClick={() => scrollToSection('produits')} className="block text-lg hover:opacity-60 transition-opacity">
              Produits
            </button>
            <button onClick={() => scrollToSection('apropos')} className="block text-lg hover:opacity-60 transition-opacity">
              À propos
            </button>
            <a href="tel:0781324474" className="block text-sm bg-[#2D2A26] text-white px-8 py-4 rounded-full text-center">
              Nous contacter
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
