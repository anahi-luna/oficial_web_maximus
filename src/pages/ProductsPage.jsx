
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import { fetchProductos } from "../services/apiService";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductListing from "../components/ProductListing";
import FiltersDrawer from "../components/FiltersDrawer";

const normalizarTexto = (texto = "") => {
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const categoriasNav = [
  { label: "Ver todo", value: "" },
  { label: "Novedades", value: "novedades" },
  { label: "Remeras", value: "remeras" },
  { label: "Camisas", value: "camisas" },
  { label: "Buzos y Abrigos", value: "abrigos" },
  { label: "Pantalones", value: "pantalones" },
  { label: "Joggers", value: "joggers" },
];

const titulosCategorias = {
  "": "Hombre — Todo",
  novedades: "Hombre — Novedades",
  remeras: "Hombre — Remeras y Musculosas",
  camisas: "Hombre — Camisas",
  abrigos: "Hombre — Buzos y Abrigos",
  pantalones: "Hombre — Pantalones",
  joggers: "Hombre — Joggers",
};

const categoriasValidas = categoriasNav.map(
  (categoria) => categoria.value
);

const esDestacado = (producto) => {
  const valor = producto.destacado;

  return (
    valor === true ||
    valor === 1 ||
    ["true", "1", "si", "sí", "verdadero"].includes(
      normalizarTexto(valor)
    )
  );
};

const coincideCategoria = (producto, categoria) => {
  const categoriaProducto = normalizarTexto(
    producto.categoria
  );

  const nombreProducto = normalizarTexto(
    producto.nombre
  );

  const textoProducto =
    `${categoriaProducto} ${nombreProducto}`;

  const esJogger =
    nombreProducto.includes("jogger") ||
    ["jogger", "joggers"].includes(categoriaProducto);

  switch (categoria) {
    case "novedades":
      return esDestacado(producto);

    case "remeras":
      return (
        textoProducto.includes("remera") ||
        textoProducto.includes("musculosa")
      );

    case "camisas":
      return textoProducto.includes("camisa");

    case "abrigos":
      return (
        textoProducto.includes("abrigo") ||
        textoProducto.includes("campera") ||
        textoProducto.includes("buzo")
      );

    case "pantalones":
      return (
        !esJogger &&
        (
          categoriaProducto.includes("pantalon") ||
          nombreProducto.includes("pantalon")
        )
      );

    case "joggers":
      return esJogger;

    default:
      return true;
  }
};

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] =
    useState(true);
  const [errorProductos, setErrorProductos] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoriaURL = normalizarTexto(
    searchParams.get("categoria") || ""
  );

  const categoriaActiva = categoriasValidas.includes(
    categoriaURL
  )
    ? categoriaURL
    : "";

  const [selectedFilters, setSelectedFilters] = useState({
    talles: [],
    categorias: [],
    colores: [],
    precios: [],
  });

  // Cargar productos
  useEffect(() => {
    let cancelado = false;

    const cargarProductos = async () => {
      try {
        setCargandoProductos(true);
        setErrorProductos(false);

        const data = await fetchProductos();

        if (!cancelado) {
          setProductos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);

        if (!cancelado) {
          setErrorProductos(true);
          setProductos([]);
        }
      } finally {
        if (!cancelado) {
          setCargandoProductos(false);
        }
      }
    };

    cargarProductos();

    return () => {
      cancelado = true;
    };
  }, []);

  // Sincronizar la categoría de la URL con el filtro lateral.
  useEffect(() => {
    setSelectedFilters((prev) => ({
      ...prev,
      categorias: categoriaActiva
        ? [categoriaActiva]
        : [],
    }));
  }, [categoriaActiva]);

  // Navegación superior
  const seleccionarCategoria = (categoria) => {
    const nuevosParametros = new URLSearchParams(
      searchParams
    );

    if (categoria) {
      nuevosParametros.set("categoria", categoria);
    } else {
      nuevosParametros.delete("categoria");
    }

    setSearchParams(nuevosParametros);
  };

  // Filtros laterales
  const onToggleFilter = (group, value) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[group].includes(value);

      return {
        ...prev,
        [group]: alreadySelected
          ? prev[group].filter((item) => item !== value)
          : [...prev[group], value],
      };
    });
  };

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      // Categoría seleccionada en la barra superior
      if (
        categoriaActiva &&
        !coincideCategoria(producto, categoriaActiva)
      ) {
        return false;
      }

      // Talle
      const tallesProducto = Array.isArray(producto.talles)
        ? producto.talles.map(normalizarTexto)
        : [];

      const cumpleTalle =
        selectedFilters.talles.length === 0 ||
        selectedFilters.talles.some((talle) =>
          tallesProducto.includes(normalizarTexto(talle))
        );

      // Categorías de los filtros laterales
      const cumpleCategoria =
        selectedFilters.categorias.length === 0 ||
        selectedFilters.categorias.some((categoria) =>
          coincideCategoria(producto, categoria)
        );

      // Color
      const coloresProducto = Array.isArray(producto.colores)
        ? producto.colores.map(normalizarTexto)
        : [];

      const cumpleColor =
        selectedFilters.colores.length === 0 ||
        selectedFilters.colores.some((color) =>
          coloresProducto.includes(normalizarTexto(color))
        );

      // Precio minorista
      const precio = Number(producto.precio || 0);

      const cumplePrecio =
        selectedFilters.precios.length === 0 ||
        selectedFilters.precios.some((rango) => {
          if (rango === "hasta-40000") {
            return precio <= 40000;
          }

          if (rango === "40000-70000") {
            return precio > 40000 && precio <= 70000;
          }

          return true;
        });

      return (
        cumpleTalle &&
        cumpleCategoria &&
        cumpleColor &&
        cumplePrecio
      );
    });
  }, [productos, selectedFilters, categoriaActiva]);

  return (
    <main>
      {/* Encabezado */}
      <section className="border-b border-stone-300 bg-stone-50 px-5 pt-10 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="font-serif text-3xl text-stone-950 md:text-4xl">
            {titulosCategorias[categoriaActiva]}
          </h1>

          {/* Navegación de categorías */}
          <nav
            aria-label="Categorías de productos"
            className="mt-5 flex gap-6 overflow-x-auto whitespace-nowrap border-b border-stone-300"
          >
            {categoriasNav.map((categoria) => {
              const activa =
                categoria.value === categoriaActiva;

              return (
                <button
                  key={categoria.value || "todo"}
                  type="button"
                  onClick={() =>
                    seleccionarCategoria(categoria.value)
                  }
                  aria-current={activa ? "page" : undefined}
                  className={`shrink-0 border-b pb-3 text-sm transition-colors ${
                    activa
                      ? "border-stone-900 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {categoria.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Productos */}
      {cargandoProductos ? (
        <section className="px-5 py-20 text-center md:px-8">
          <p className="text-sm text-stone-500">
            Cargando productos...
          </p>
        </section>
      ) : errorProductos ? (
        <section className="px-5 py-20 text-center md:px-8">
          <p className="text-sm text-stone-700">
            No pudimos cargar los productos. Revisá tu conexión
            e intentá nuevamente.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 bg-stone-900 px-5 py-3 text-sm text-white hover:bg-stone-700"
          >
            Reintentar
          </button>
        </section>
      ) : (
        <section className="bg-stone-50 px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto flex max-w-[1400px] gap-8 lg:gap-10">
            {/* Filtros desktop */}
            <div className="hidden shrink-0 md:block">
              <FiltersSidebar
                selectedFilters={selectedFilters}
                onToggleFilter={onToggleFilter}
              />
            </div>

            {/* Listado */}
            <div className="min-w-0 flex-1">
              {productosFiltrados.length > 0 ? (
                <ProductListing
                  products={productosFiltrados}
                />
              ) : (
                <div className="py-16 text-center">
                  <h2 className="font-serif text-xl text-stone-900">
                    No encontramos productos
                  </h2>

                  <p className="mt-2 text-sm text-stone-500">
                    Probá con otra categoría o quitá algunos
                    filtros.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      seleccionarCategoria("");
                      setSelectedFilters({
                        talles: [],
                        categorias: [],
                        colores: [],
                        precios: [],
                      });
                    }}
                    className="mt-5 border border-stone-300 px-5 py-3 text-sm text-stone-800 transition hover:bg-stone-100"
                  >
                    Ver todos los productos
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Espacio para el botón de filtros móvil */}
      <div className="h-20 md:hidden" />

      {/* Botón filtros móvil */}
      <div className="pointer-events-none sticky bottom-5 z-50 flex h-0 justify-center md:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="pointer-events-auto relative top-[-60px] flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-xs font-semibold text-white shadow-xl active:scale-95"
        >
          <SlidersHorizontal size={16} strokeWidth={2} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Filtros móvil */}
      <FiltersDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        selectedFilters={selectedFilters}
        onToggleFilter={onToggleFilter}
      />
    </main>
  );
};

export default ProductsPage;
