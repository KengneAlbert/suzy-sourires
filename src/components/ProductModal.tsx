import { X, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-square lg:aspect-auto overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.featured && (
              <div className="absolute top-6 left-6 bg-[#E8B4A0] text-white px-6 py-3 rounded-full text-sm font-medium">
                Coup de coeur
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="p-8 lg:p-12 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#E8B4A0] rounded-full"></div>
                <span className="text-xs uppercase tracking-widest text-black/50">
                  {product.category}
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-light mb-4">
                {product.name}
              </h2>

              <p className="text-xl text-black/70 mb-6">
                {product.short_description}
              </p>

              <div className="border-t border-black/10 pt-6 mb-6">
                <p className="text-lg text-black/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <Check className="w-5 h-5 text-[#E8B4A0]" />
                <span className="text-black/70">Produit artisanal de qualité</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <Check className="w-5 h-5 text-[#E8B4A0]" />
                <span className="text-black/70">Fabriqué avec soin</span>
              </div>

              {product.in_stock && (
                <div className="flex items-center gap-3 mb-8">
                  <Check className="w-5 h-5 text-[#E8B4A0]" />
                  <span className="text-green-600 font-medium">En stock</span>
                </div>
              )}

              {!product.in_stock && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
                  <p className="text-red-800 text-center font-medium">
                    Produit temporairement en rupture de stock
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-black/10 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-5xl font-light">{product.price.toFixed(2)} €</span>
              </div>

              {product.in_stock ? (
                <a
                  href="tel:0781324474"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#2D2A26] text-white px-8 py-5 rounded-full hover:scale-105 transition-transform text-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Commander par téléphone</span>
                </a>
              ) : (
                <a
                  href="tel:0781324474"
                  className="w-full inline-flex items-center justify-center gap-3 border-2 border-[#2D2A26] px-8 py-5 rounded-full hover:bg-[#2D2A26] hover:text-white transition-colors text-lg"
                >
                  <span>Me prévenir du retour en stock</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
