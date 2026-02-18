import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="apropos"
      className="py-24 lg:py-32 px-6 lg:px-8 bg-brand-dark text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-brand-rose rounded-full animate-pulse" />
              <span className="text-sm tracking-widest uppercase text-white/60">
                Pourquoi nous choisir
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl leading-tight font-light mb-12">
              Une approche
              <span className="block font-serif italic">humaine</span>
              et professionnelle
            </h2>
          </div>
          <div className="space-y-8 text-lg text-white/80 leading-relaxed">
            <p>
              Suzy Sourires a été créé en 2024 avec la conviction que notre
              monde actuel est en constante évolution et que de plus en plus de
              personnes ont besoin d&apos;aide à domicile.
            </p>
            <p>
              Nous travaillons dur pour offrir des services à domicile
              personnalisés pour chacun de nos clients. L&apos;excellence et le
              professionnalisme de nos prestataires de services sont ce qui nous
              distingue.
            </p>
            <p>
              Notre approche garantit une réactivité et une sensibilité
              optimale. Nous comprenons qu&apos;il est difficile de concilier
              les exigences de la vie quotidienne et c&apos;est pourquoi nous
              nous engageons à rendre nos services abordables et pratiques.
            </p>
            <div className="pt-8 mt-8 border-t border-white/10">
              <p className="text-white text-xl">
                Que vous ayez besoin d&apos;assistance due à votre âge, un
                handicap ou d&apos;un emploi du temps trop chargé, vous pouvez
                vous reposer sur nous.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
