import { ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-bounce-slow"></div>
              <span className="text-sm tracking-widest uppercase">Contact</span>
              <span className="text-2xl animate-float">👋</span>
            </div>
            <h2 className="text-5xl lg:text-6xl leading-tight font-light mb-12">
              Discutons de
              <span className="block font-serif italic">vos besoins</span>
            </h2>
            <p className="text-xl text-black/70 leading-relaxed mb-16">
              Disponible 7 jours sur 7 pour vous accompagner
            </p>

            <div className="space-y-10 stagger-animation">
              <a href="tel:0781324474" className="group block">
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                  <span>Téléphone</span>
                  <span className="text-lg group-hover:animate-shake">📱</span>
                </div>
                <div className="text-3xl group-hover:text-[#E8B4A0] transition-colors">07 81 32 44 74</div>
              </a>

              <a href="mailto:suzysourires31@gmail.com" className="group block">
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                  <span>Email</span>
                  <span className="text-lg group-hover:animate-float">✉️</span>
                </div>
                <div className="text-2xl group-hover:text-[#E8B4A0] transition-colors break-all">suzysourires31@gmail.com</div>
              </a>

              <div>
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">Adresse</div>
                <div className="text-xl">
                  29 Rue du Dr Fleming<br/>
                  93600 Aulnay-Sous-Bois
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">Horaires</div>
                <div className="space-y-2 text-lg">
                  <p>Lundi - Vendredi : 8h - 20h</p>
                  <p>Samedi : 9h - 19h</p>
                  <p>Dimanche : 9h - 20h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-3xl hover-lift animate-fade-in">
            <h3 className="text-2xl mb-8">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Nom</label>
                  <input
                    type="text"
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Email</label>
                  <input
                    type="email"
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors bg-transparent text-lg"
                  placeholder="Votre numéro"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-black/50 mb-3">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-[#E8B4A0] outline-none transition-colors resize-none bg-transparent text-lg"
                  placeholder="Parlez-nous de vos besoins..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-[#2D2A26] text-white px-10 py-5 rounded-full hover:scale-105 transition-transform text-lg hover-grow hover-shine"
              >
                <span>Envoyer</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
