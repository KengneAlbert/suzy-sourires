const processSteps = [
  {
    number: "01",
    title: "Contact",
    description: "Contactez-nous par téléphone ou via notre formulaire pour nous exposer vos besoins"
  },
  {
    number: "02",
    title: "Devis gratuit",
    description: "Nous établissons ensemble un devis personnalisé et transparent, adapté à votre situation"
  },
  {
    number: "03",
    title: "Intervention",
    description: "Nos intervenants qualifiés réalisent les prestations avec soin et professionnalisme"
  },
  {
    number: "04",
    title: "Satisfaction",
    description: "Votre satisfaction est notre priorité. Nous restons à votre écoute pour améliorer nos services"
  }
];

export function ProcessSteps() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
            <span className="text-sm tracking-widest uppercase">Notre processus</span>
            <span className="text-2xl animate-float">🔄</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light mb-6">
            Comment ça
            <span className="block font-serif italic">fonctionne</span>
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            Un processus simple et transparent pour des prestations de qualité
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group hover-lift">
              <div className="relative bg-gradient-to-br from-white to-[#FDFBF7] rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8B4A0]/20 hover:border-[#E8B4A0] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E8B4A0]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="text-7xl font-bold bg-gradient-to-br from-[#E8B4A0] to-[#D4A090] bg-clip-text text-transparent mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{step.number}</div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                <p className="text-black/70 leading-relaxed text-lg relative z-10">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-[#E8B4A0] to-[#E8B4A0]/30 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
