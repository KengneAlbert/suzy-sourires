/* eslint-disable @next/next/no-img-element */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/images/logo.png"
          alt="Chargement"
          width={48}
          height={48}
          className="animate-pulse"
        />
        <p className="text-sm text-black/40 font-medium">Chargement…</p>
      </div>
    </div>
  );
}
