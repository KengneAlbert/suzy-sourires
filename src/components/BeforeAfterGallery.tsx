const beforeAfterGallery = [
  {
    before: "https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Salon",
    description: "Nettoyage en profondeur"
  },
  {
    before: "https://images.pexels.com/photos/5824471/pexels-photo-5824471.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Cuisine",
    description: "Dégraissage complet"
  },
  {
    before: "https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Salle de bain",
    description: "Détartrage et brillance"
  }
];

export function BeforeAfterGallery() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-spin-slow"></div>
            <span className="text-sm tracking-widest uppercase">Nos résultats</span>
            <span className="text-2xl animate-bounce-slow">✨</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light mb-6">
            Avant / Après
            <span className="block font-serif italic">notre passage</span>
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            Découvrez la différence que nos services de nettoyage peuvent faire
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-animation">
          {beforeAfterGallery.map((item, index) => (
            <div key={index} className="group hover-lift">
              <div className="bg-[#FDFBF7] rounded-3xl overflow-hidden hover-shine">
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.before}
                      alt={`Avant - ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Avant
                    </div>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.after}
                      alt={`Après - ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#E8B4A0] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Après
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-black/60">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
