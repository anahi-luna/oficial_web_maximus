import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  id,
  eyebrow,
  title,
  products = [],
}) => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.9;

    carouselRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      className="border-b border-stone-200 bg-stone-50 px-5 py-14 md:px-8 md:py-20"
    >
      {/* Encabezado */}
      <div className="mb-8 flex items-end justify-between md:mb-10">
        <div>
          {eyebrow && (
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-stone-500 md:text-xs">
              {eyebrow}
            </p>
          )}

          <h2 className="font-serif text-3xl text-stone-950 md:text-4xl">
            {title}
          </h2>
        </div>

        {/* Flechas desktop */}
        {products.length > 4 && (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollCarousel("prev")}
              aria-label="Productos anteriores"
              className="
                flex h-10 w-10 items-center justify-center
                border border-stone-300
                text-stone-800
                transition-colors
                hover:bg-stone-900 hover:text-white
              "
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("next")}
              aria-label="Más productos"
              className="
                flex h-10 w-10 items-center justify-center
                border border-stone-300
                text-stone-800
                transition-colors
                hover:bg-stone-900 hover:text-white
              "
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {/* Productos */}
      {products.length > 0 ? (
        <div
          ref={carouselRef}
          className="
            flex
            gap-3
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            pb-4
            scrollbar-hide
            md:gap-5
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="
                min-w-[calc((100%-12px)/2)]
                snap-start
                md:min-w-[calc((100%-60px)/4)]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-sm text-stone-500">
          No hay productos disponibles.
        </div>
      )}
    </section>
  );
};

export default ProductGrid;