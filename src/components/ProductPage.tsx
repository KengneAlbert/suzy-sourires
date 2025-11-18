import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Star, Shield, Truck, X } from 'lucide-react';
import { Product } from '../types/product';
import { supabase } from '../lib/supabase';

interface ProductPageProps {
  productId: string;
  onClose: () => void;
}

export function ProductPage({ productId, onClose }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .maybeSingle();

      if (!error && data) {
        setProduct(data);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#FDFBF7] z-[100] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E8B4A0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 bg-[#FDFBF7] z-[100] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-black/50 mb-6">Produit non trouvé</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-[#2D2A26] text-white px-8 py-4 rounded-full hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image_url];

  return (
    <div className="fixed inset-0 bg-[#FDFBF7] z-[100] overflow-y-auto">
      <div className="min-h-screen">
        <header className="sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-xl z-50 border-b border-black/5">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
            <div className="flex items-center justify-between h-20">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour aux produits</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8B4A0]/10 via-white to-[#E8B4A0]/5 shadow-2xl group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {images.length > 1 && (
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {selectedImage + 1} / {images.length}
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className={`grid gap-4 ${images.length === 2 ? 'grid-cols-2' : images.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group/thumb ${
                        selectedImage === index
                          ? 'border-[#E8B4A0] ring-4 ring-[#E8B4A0]/20 shadow-xl scale-105'
                          : 'border-black/10 hover:border-[#E8B4A0]/50 hover:scale-105 shadow-md hover:shadow-xl'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        selectedImage === index
                          ? 'bg-[#E8B4A0]/20'
                          : 'bg-black/40 group-hover/thumb:bg-black/20'
                      }`}></div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative text-xs uppercase tracking-widest text-black/50 px-4 py-2 rounded-full bg-black/5 border border-black/10">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="relative inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white px-4 py-2 rounded-full bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] shadow-lg animate-pulse">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Coup de coeur
                    </span>
                  )}
                </div>
                <h1 className="text-5xl lg:text-7xl font-light mb-6 bg-gradient-to-br from-black via-black to-black/70 bg-clip-text text-transparent">{product.name}</h1>
                <p className="text-2xl text-black/70 leading-relaxed italic border-l-4 border-[#E8B4A0] pl-6">
                  {product.short_description}
                </p>
              </div>

              <div className="relative flex items-baseline gap-4 py-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E8B4A0]/5 via-[#E8B4A0]/10 to-[#E8B4A0]/5 rounded-3xl"></div>
                <div className="relative flex items-baseline gap-4 px-8">
                  <span className="text-6xl font-bold bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] bg-clip-text text-transparent">{product.price.toFixed(2)} €</span>
                  <span className="text-lg text-black/50">TTC</span>
                </div>
              </div>

              {!product.in_stock && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <p className="text-red-800 font-medium">
                    Ce produit est actuellement en rupture de stock
                  </p>
                </div>
              )}

              {product.in_stock && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-black/50 mb-4">
                      Quantité
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-full border-2 border-black/10 hover:border-[#E8B4A0] transition-colors flex items-center justify-center text-xl"
                      >
                        -
                      </button>
                      <span className="text-2xl font-light w-16 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-full border-2 border-black/10 hover:border-[#E8B4A0] transition-colors flex items-center justify-center text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button className="group/btn relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2D2A26] via-[#3D3A36] to-[#2D2A26] text-white px-10 py-6 rounded-full hover:scale-105 transition-all duration-300 text-lg font-medium shadow-2xl hover:shadow-[#E8B4A0]/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    <ShoppingBag className="w-5 h-5 relative z-10 group-hover/btn:scale-110 transition-transform" />
                    <span className="relative z-10">Ajouter au panier - {(product.price * quantity).toFixed(2)} €</span>
                  </button>
                </div>
              )}

              <div className="relative bg-gradient-to-br from-white via-[#FDFBF7] to-white rounded-3xl p-8 space-y-6 shadow-xl border border-[#E8B4A0]/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E8B4A0]/10 to-transparent rounded-full blur-3xl"></div>
                <h2 className="text-3xl font-light flex items-center gap-3 relative z-10">
                  <span className="bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] bg-clip-text text-transparent">Description</span>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#E8B4A0]/50 to-transparent"></div>
                </h2>
                <p className="text-lg text-black/70 leading-relaxed whitespace-pre-line relative z-10">
                  {product.description}
                </p>
              </div>

              <div className="bg-gradient-to-br from-white via-[#FDFBF7] to-white rounded-3xl p-8 shadow-xl border border-[#E8B4A0]/20">
                <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] bg-clip-text text-transparent">Avantages</span>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#E8B4A0]/50 to-transparent"></div>
                </h3>
                <div className="space-y-4">
                  <div className="group/card relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FDFBF7] to-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E8B4A0]/30">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] flex items-center justify-center flex-shrink-0 shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 text-lg">Qualité garantie</p>
                      <p className="text-sm text-black/60">Produit artisanal fait main avec soin</p>
                    </div>
                  </div>
                  <div className="group/card relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FDFBF7] to-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E8B4A0]/30">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] flex items-center justify-center flex-shrink-0 shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300">
                      <Truck className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 text-lg">Livraison gratuite</p>
                      <p className="text-sm text-black/60">Dès 50€ d'achat dans toute la région</p>
                    </div>
                  </div>
                  <div className="group/card relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FDFBF7] to-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E8B4A0]/30">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] flex items-center justify-center flex-shrink-0 shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300">
                      <Star className="w-7 h-7 text-white fill-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 text-lg">100% artisanal</p>
                      <p className="text-sm text-black/60">Fabrication française et locale</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-light mb-6 flex items-center gap-3">
                  <span>Informations produit</span>
                  <div className="flex-1 h-px bg-black/5"></div>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-black/5">
                    <span className="text-black/50">Référence</span>
                    <span className="font-medium font-mono text-sm">{product.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-black/5">
                    <span className="text-black/50">Catégorie</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-black/50">Disponibilité</span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${product.in_stock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {product.in_stock ? 'En stock' : 'Rupture de stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
