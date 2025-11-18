import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Product } from './types/product';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CTABanner } from './components/CTABanner';
import { ProcessSteps } from './components/ProcessSteps';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { AboutSection } from './components/AboutSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { CoverageArea } from './components/CoverageArea';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ProductPage } from './components/ProductPage';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedProduct !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navigation scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <CTABanner />
      <ProcessSteps />
      <Philosophy />
      <Services scrollToSection={scrollToSection} />
      <AboutSection />
      <BeforeAfterGallery />

      <section className="py-20 px-8 lg:px-16 bg-[#2D2A26] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-light mb-4">
                Une question ?
                <span className="block font-serif italic">Appelez-nous</span>
              </h3>
              <p className="text-xl text-white/80">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="tel:0781324474"
                className="inline-flex items-center gap-3 bg-[#E8B4A0] text-white px-10 py-5 rounded-full hover:scale-105 transition-transform text-lg font-medium"
              >
                <span>07 81 32 44 74</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="produits" className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-spin-slow"></div>
              <span className="text-sm tracking-widest uppercase">Notre boutique</span>
              <span className="text-2xl animate-float">🛒️</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="text-5xl lg:text-6xl font-light max-w-3xl">
                Des produits artisanaux
                <span className="block font-serif italic">de qualité</span>
              </h2>
              <p className="text-xl text-black/70 max-w-xl">
                Découvrez notre sélection de produits faits main avec passion et savoir-faire
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm transition-all hover:scale-110 ${
                    selectedCategory === category
                      ? 'bg-[#2D2A26] text-white animate-bounce-slow'
                      : 'bg-white text-black hover:bg-black/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoadingProducts ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#E8B4A0] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">Aucun produit disponible dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setViewingProductId(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CoverageArea />
      <FAQ />
      <ContactSection />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {viewingProductId && (
        <ProductPage
          productId={viewingProductId}
          onClose={() => setViewingProductId(null)}
        />
      )}
    </div>
  );
}

export default App;
