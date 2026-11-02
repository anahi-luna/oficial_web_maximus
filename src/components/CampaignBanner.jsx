import portadaVerano from "../assets/portada-verano.png";
import portadaMobileVerano from "../assets/portada-mobile-verano.png";

const CampaignBanner = () => {
  return (
    <section className="w-full overflow-hidden">
      {/* DESKTOP */}
      <div className="hidden md:block">
        <img
          src={portadaVerano}
          alt="Colección verano Maximus - talles grandes para hombres"
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* MOBILE */}
      <div className="relative block md:hidden">
        <img
          src={portadaMobileVerano}
          alt="Colección verano Maximus"
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="max-w-[340px]">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white">
              Colección — Verano
            </span>

            <h2 className="mt-3 font-serif text-[34px] leading-[1.05] text-white sm:text-4xl">
              Verano
            </h2>

            <p className="mt-3 text-sm leading-5 text-white/95 sm:text-base">
              Talles grandes para hombres.
              Prendas frescas, cómodas y pensadas para todos los días.
            </p>

            <a
              href="#productos-primavera-verano"
              className="
                mt-5 inline-block
                border-b border-white
                pb-1
                text-sm font-medium
                text-white
                transition-opacity
                hover:opacity-70
              "
            >
              Ver colección
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignBanner;