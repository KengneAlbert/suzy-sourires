import { ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#E8B4A0]/30 hover-lift hover-shine animate-fade-in-up"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg animate-subtle-pulse">
            ✨ Coup de coeur
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white text-xl font-bold">Rupture de stock</span>
          </div>
        )}
      </div>
      <div className="p-6 bg-gradient-to-br from-white to-[#FDFBF7] group-hover:from-[#FDFBF7] group-hover:to-white transition-colors duration-300">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="inline-block text-xs uppercase tracking-widest text-white bg-black/80 px-3 py-1 rounded-full mb-3">
              {product.category}
            </p>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-[#E8B4A0] transition-colors">{product.name}</h3>
            <p className="text-base text-black/70 line-clamp-2 font-medium">
              {product.short_description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-[#E8B4A0]/20">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#E8B4A0] to-[#D4A090] bg-clip-text text-transparent">{product.price.toFixed(2)} €</span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
