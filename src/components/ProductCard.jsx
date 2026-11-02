import { useMemo } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const images = useMemo(() => {
    if (!product?.imagen_url) return [];

    return product.imagen_url
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);
  }, [product?.imagen_url]);

  const imagenPrincipal = images[0];
  const imagenHover = images[1] || images[0];

  const precio = Number(product?.precio || 0);

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block min-w-0"
    >
      <article>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
          {imagenPrincipal ? (
            <>
              <img
                src={imagenPrincipal}
                alt={product?.nombre || "Producto Maximus"}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                loading="lazy"
              />

              <img
                src={imagenHover}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                loading="lazy"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-stone-400">
              Sin imagen
            </div>
          )}
        </div>

        <div className="pt-4">
          {product?.categoria && (
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-stone-500">
              {product.categoria}
            </p>
          )}

          <h3 className="text-sm font-medium text-stone-900 md:text-[15px]">
            {product?.nombre}
          </h3>

          {product?.material && (
            <p className="mt-1 text-xs text-stone-500">
              {product.material}
            </p>
          )}

          <p className="mt-2 text-sm font-medium text-stone-900">
            {precioFormateado}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;