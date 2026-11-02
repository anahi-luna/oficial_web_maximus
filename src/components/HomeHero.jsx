import portadaInicial from "../assets/portada-inicial.png";
import portadaMobileInicial from "../assets/portada-mobile-inicial.png";

export default function HomeHero() {
  return (
    <section className="w-full overflow-hidden">

      {/* =========================
          DESKTOP
      ========================== */}
      <div className="hidden md:block">
        <img
          src={portadaInicial}
          alt="Maximus - ropa de hombre en talles grandes"
          className="block h-auto w-full"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* =========================
          MOBILE
      ========================== */}
      <div className="relative block md:hidden">
        <img
          src={portadaMobileInicial}
          alt="Maximus - colección de ropa para hombre"
          className="block h-auto w-full"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Texto mobile */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="max-w-[340px]">
            
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white">
              Hombre — Talles especiales
            </span>

            <h1 className="mt-3 font-serif text-[32px] leading-[1.05] text-white sm:text-4xl">
              Ropa a tu escala real
            </h1>

            <p className="mt-3 text-sm leading-5 text-white/95 sm:text-base">
              De la L a la 6XL, sin achicar el diseño.
              Prendas pensadas desde el patronaje para el cuerpo grande.
            </p>

            <button
              type="button"
              className="mt-5 border-b border-white pb-1 text-sm font-medium text-white transition-opacity hover:opacity-70"
            >
              Ver colección
            </button>

          </div>
        </div>
      </div>

    </section>
  );
}