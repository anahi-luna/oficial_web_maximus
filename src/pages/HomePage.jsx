import { useEffect, useState } from "react";

import HomeHero from "../components/HomeHero";
import CategoryLinks from "../components/CategoryLinks";
import ProductGrid from "../components/ProductGrid";
import CampaignBanner from "../components/CampaignBanner";
import Benefits from "../components/Benefits";

import { fetchProductos } from "../services/apiService";

const normalizarTexto = (texto = "") => {
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const perteneceATemporada = (producto, temporadas) => {
  const temporada = normalizarTexto(producto.temporada);

  return temporadas.some((item) =>
    temporada.includes(normalizarTexto(item))
  );
};

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await fetchProductos();

      setProductos(data);
      setCargandoProductos(false);
    };

    cargarProductos();
  }, []);

  const productosOtonoInvierno = productos.filter((producto) =>
    perteneceATemporada(producto, ["otoño", "invierno"])
  );

  const productosPrimaveraVerano = productos.filter((producto) =>
    perteneceATemporada(producto, ["primavera", "verano"])
  );

  return (
    <main>
      <HomeHero />

      <CategoryLinks />

      {cargandoProductos ? (
        <section className="px-5 py-20 text-center">
          <p className="text-sm text-stone-500">
            Cargando productos...
          </p>
        </section>
      ) : (
        <>
          {/* OTOÑO — INVIERNO */}
          <ProductGrid
            id="productos-otono-invierno"
            eyebrow="Nueva colección"
            title="Otoño — Invierno"
            products={productosOtonoInvierno}
          />

          {/* PORTADA VERANO */}
          <CampaignBanner />

          {/* PRIMAVERA — VERANO */}
          <ProductGrid
            id="productos-primavera-verano"
            eyebrow="Colección"
            title="Primavera — Verano"
            products={productosPrimaveraVerano}
          />
        </>
      )}

      <Benefits />
    </main>
  );
};

export default HomePage;