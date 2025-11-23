import { MapPin, CheckCircle2 } from 'lucide-react';

const coverageAreas = [
  "Aulnay-Sous-Bois",
  "Sevran",
  "Drancy",
  "Le Blanc-Mesnil",
  "Bondy",
  "Villepinte",
  "Tremblay-en-France",
  "Livry-Gargan",
  "Noisy-le-Sec",
  "Bobigny",
  "Pantin",
  "Romainville"
];

export function CoverageArea() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
            <span className="text-sm tracking-widest uppercase">Zone d'intervention</span>
            <span className="text-2xl animate-wiggle">🗺️</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light mb-6">
            Nous intervenons
            <span className="block font-serif italic">près de chez vous</span>
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12">
            Découvrez les villes et quartiers où nous proposons nos services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Zone d'intervention"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#E8B4A0]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#E8B4A0]" />
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-3">Secteur principal</h3>
                <p className="text-black/70 text-lg leading-relaxed">
                  Basés à Aulnay-Sous-Bois, nous couvrons toute la Seine-Saint-Denis (93)
                  et les communes limitrophes. Notre proximité nous permet d'intervenir
                  rapidement et de vous garantir un service de qualité.
                </p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] rounded-3xl p-8 hover-lift animate-fade-in">
              <h4 className="text-lg font-medium mb-6">Communes desservies</h4>
              <div className="grid grid-cols-2 gap-4">
                {coverageAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E8B4A0] flex-shrink-0" />
                    <span className="text-black/80">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-black/60 mt-6 pt-6 border-t border-black/10">
                Votre ville n'est pas dans la liste ? Contactez-nous, nous étudierons votre demande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
