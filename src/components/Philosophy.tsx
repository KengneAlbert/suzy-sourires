export function Philosophy() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-[#E8B4A0]/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Sourire et bienveillance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm">
              <span className="text-lg animate-bounce-slow">💭</span>
              <span>Notre philosophie</span>
            </div>
            <h2 className="text-5xl lg:text-6xl leading-tight font-light">
              "Un sourire ne coûte rien mais
              <span className="block font-serif italic">apporte beaucoup"</span>
            </h2>
            <p className="text-xl text-black/70 leading-relaxed max-w-xl">
              Il enrichit celui qui reçoit sans appauvrir celui qui le donne. C'est avec cette conviction que nous vous accompagnons depuis 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
