export function Footer() {
  return (
    <footer className="py-16 px-8 lg:px-16 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-3xl font-serif italic mb-2">
              <span>Suzy Sourires</span>
              <span className="text-2xl">😊</span>
            </div>
            <p className="text-sm text-black/50">Aide à domicile depuis 2024</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
            <a href="tel:0781324474" className="hover:text-[#E8B4A0] transition-colors">
              Téléphone
            </a>
            <a href="mailto:suzysourires31@gmail.com" className="hover:text-[#E8B4A0] transition-colors">
              Email
            </a>
            <span className="text-black/50">© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
