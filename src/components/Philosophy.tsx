import Image from "next/image";

export function Philosophy() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 bg-brand-rose/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl relative overflow-hidden hover-lift animate-fade-in">
              <Image
                src="/images/fondatrice.jpg"
                alt="Sourire et bienveillance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8 animate-slide-in-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm">
              <span className="text-lg animate-bounce-slow">💛</span>
              <span>Notre philosophie</span>
            </div>
            <h2 className="text-5xl lg:text-6xl leading-tight font-light">
              &ldquo;Un sourire ne coûte rien mais
              <span className="block font-serif italic">
                apporte beaucoup&rdquo;
              </span>
            </h2>
            <p className="text-xl text-black/70 leading-relaxed max-w-xl">
              Il enrichit celui qui reçoit sans appauvrir celui qui le donne.
              C&apos;est avec cette conviction que nous vous accompagnons depuis
              2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
