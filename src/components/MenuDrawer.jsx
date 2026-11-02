
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  ArrowUpRight,
  MessageCircle,
  ChevronDown,
  MapPin,
} from "lucide-react";

const categorias = [
  {
    nombre: "Nueva colección",
    destino: "/productos",
    destacado: true,
  },
  {
    nombre: "Remeras y musculosas",
    destino: "/productos?categoria=remeras",
  },
  {
    nombre: "Camisas",
    destino: "/productos?categoria=camisas",
  },
  {
    nombre: "Pantalones y joggers",
    destino: "/productos?categoria=pantalones",
  },
  {
    nombre: "Buzos y abrigos",
    destino: "/productos?categoria=abrigos",
  },
  {
    nombre: "Talles especiales · 6 al 14",
    destino: "/productos",
  },
];

export default function MenuDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [seccionAbierta, setSeccionAbierta] = useState(null);

  const toggleSeccion = (seccion) => {
    setSeccionAbierta((actual) =>
      actual === seccion ? null : seccion
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const cerrarConEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", cerrarConEscape);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = overflowAnterior;
    };
  }, [isOpen, onClose]);

  const irA = (destino) => {
    onClose();
    navigate(destino);
  };

  const whatsapp = "https://wa.me/5491140857998";

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Menú lateral */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isOpen}
        className={`fixed left-0 top-0 z-[90] flex h-dvh w-[min(88vw,390px)] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
            Navegación
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            tabIndex={isOpen ? 0 : -1}
            className="flex items-center gap-2 text-sm text-stone-700 transition hover:text-black"
          >
            <span>Cerrar</span>
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 pb-7 pt-8">
          {/* Marca */}
          <Link
            to="/"
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className="mb-8 block font-serif text-3xl tracking-wide text-stone-900"
          >
            MAXIMUS
          </Link>

          {/* Categorías */}
          <nav aria-label="Categorías de productos">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Colección
            </p>

            <div className="flex flex-col">
              {categorias.map((categoria) => (
                <button
                  key={categoria.nombre}
                  type="button"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => irA(categoria.destino)}
                  className={`group flex items-center justify-between border-b border-stone-100 py-4 text-left transition hover:pl-2 ${
                    categoria.destacado
                      ? "font-semibold text-stone-950"
                      : "text-stone-700"
                  }`}
                >
                  <span className="text-[15px]">
                    {categoria.nombre}
                  </span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="text-stone-400 transition group-hover:text-stone-900"
                  />
                </button>
              ))}
            </div>
          </nav>

          <div className="my-7 border-t border-stone-200" />

          {/* Información */}
          <div className="flex flex-col">

            {/* TIENDA */}
            <div className="border-b border-stone-100">
              <button
                type="button"
                onClick={() => toggleSeccion("tienda")}
                aria-expanded={seccionAbierta === "tienda"}
                tabIndex={isOpen ? 0 : -1}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-stone-800 transition hover:text-black"
              >
                <span>Tienda</span>

                <ChevronDown
                  size={17}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${
                    seccionAbierta === "tienda"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {seccionAbierta === "tienda" && (
                <div className="mb-4 rounded-lg bg-stone-50 px-4 py-4">
                  <p className="text-[13px] leading-6 text-stone-600">
                    Visitá nuestro local en Floresta, CABA.
                    Encontrá ropa masculina en talles
                    especiales, con variedad de modelos
                    y atención personalizada.
                  </p>

                  <div className="mt-4 flex items-start gap-2">
                    <MapPin
                      size={17}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-stone-800"
                    />

                    <div>
                      <p className="text-[13px] font-semibold text-stone-900">
                        Nuestra dirección
                      </p>

                      <p className="mt-1 text-[13px] leading-5 text-stone-600">
                        Joaquín V. González 460
                        <br />
                        Galería Santiago
                        <br />
                        Locales 39 y 41
                        <br />
                        Floresta, CABA
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* NOSOTROS */}
            <div className="border-b border-stone-100">
              <button
                type="button"
                onClick={() => toggleSeccion("nosotros")}
                aria-expanded={seccionAbierta === "nosotros"}
                tabIndex={isOpen ? 0 : -1}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-stone-800 transition hover:text-black"
              >
                <span>Nosotros</span>

                <ChevronDown
                  size={17}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${
                    seccionAbierta === "nosotros"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {seccionAbierta === "nosotros" && (
                <div className="mb-4 rounded-lg bg-stone-50 px-4 py-4">
                  <p className="text-[13px] leading-6 text-stone-600">
                    En MAXIMUS somos fabricantes directos
                    de indumentaria masculina en talles
                    reales, especiales y grandes.
                    Creamos prendas cómodas, con buen
                    calce y diseños pensados para
                    acompañarte todos los días.
                  </p>

                  <p className="mt-3 text-[13px] font-medium text-stone-900">
                    Talles del 6 al 14.
                  </p>
                </div>
              )}
            </div>

            {/* WHATSAPP */}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
              className="flex items-center gap-2 py-5 text-sm font-medium text-stone-900 transition hover:text-stone-500"
            >
              <MessageCircle
                size={17}
                strokeWidth={1.5}
              />
              Contacto por WhatsApp
            </a>
          </div>
        </div>

        {/* Pie del menú */}
        <div className="mt-auto border-t border-stone-200 bg-stone-50 px-6 py-5">
          <p className="text-xs leading-5 text-stone-500">
            MAXIMUS · Moda masculina en talles especiales.
          </p>
        </div>
      </aside>
    </>
  );
}
