import Image from "next/image";
import SalonSale from "../../public/images/SaleSalon.png";
import CuisineSale from "../../public/images/CuisineSale.png";
import SalleBainSale from "../../public/images/SaleBainSale.png";
import SalonPropre from "../../public/images/SalonPropre.png";
import CuisinePropre from "../../public/images/CuisinePropre.png";
import SalleBainPropre from "../../public/images/SaleBainPropre.png";

const beforeAfterGallery = [
  {
    before: SalonSale,
    after: SalonPropre,
    title: "Salon",
    description: "Nettoyage en profondeur",
  },
  {
    before: CuisineSale,
    after: CuisinePropre,
    title: "Cuisine",
    description: "Dégraissage complet",
  },
  {
    before: SalleBainSale,
    after: SalleBainPropre,
    title: "Salle de bain",
    description: "Détartrage et brillance",
  },
];

export function BeforeAfterGallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-brand-rose rounded-full animate-spin-slow" />
            <span className="text-sm tracking-widest uppercase">
              Nos résultats
            </span>
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
              <div className="bg-brand-cream rounded-3xl overflow-hidden hover-shine">
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.before}
                      alt={`Avant - ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Avant
                    </div>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.after}
                      alt={`Après - ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-brand-rose text-white px-3 py-1 rounded-full text-xs font-medium">
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
