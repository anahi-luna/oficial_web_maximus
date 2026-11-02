
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin, MessageCircle, Mail } from "lucide-react";

// Icono de Instagram
const InstagramIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

// Icono de Facebook
const FacebookIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.3z" />
  </svg>
);

const Footer = () => {
  const [tiendaAbierta, setTiendaAbierta] = useState(false);
  const [nosotrosAbierto, setNosotrosAbierto] = useState(false);

  const categorias = [
    { nombre: "Ver todos los productos", to: "/productos" },
    { nombre: "Remeras y musculosas", to: "/productos?categoria=remeras" },
    { nombre: "Camisas", to: "/productos?categoria=camisas" },
    { nombre: "Pantalones", to: "/productos?categoria=pantalones" },
    { nombre: "Joggers", to: "/productos?categoria=joggers" },
    { nombre: "Buzos y abrigos", to: "/productos?categoria=abrigos" },
  ];

  const redes = [
    {
      nombre: "Instagram",
      href: "https://www.instagram.com/maximus11025?psln=MWFodjJtbzg2cmFubw==",
      icono: <InstagramIcon />,
    },
    {
      nombre: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61582302823395&sfnsn=scwspwa&mibextid=RUbZ1f",
      icono: <FacebookIcon />,
    },
    {
      nombre: "TikTok",
      href: null,
      icono: <span className="text-xl leading-none">♪</span>,
    },
  ];

  return (
    <footer className="bg-black text-stone-100">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Marca */}
          <div>
            <Link
              to="/"
              aria-label="MAXIMUS - Ir al inicio"
              className="inline-block font-serif text-3xl tracking-[0.12em] text-white transition-opacity hover:opacity-80"
            >
              MAXIMUS
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-300">
              Indumentaria masculina en talles reales, especiales y grandes.
              Prendas cómodas, con buen calce y diseños para todos los días.
            </p>

            <p className="mt-4 text-sm font-medium text-stone-200">
              Talles del 6 al 14
            </p>

            <p className="mt-2 text-xs leading-5 text-stone-400">
              Envíos a todo el país · Pedidos por WhatsApp
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-white">
              TIENDA
            </h3>

            <nav className="flex flex-col items-start gap-3">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.to}
                  to={categoria.to}
                  className="text-sm text-stone-300 transition-colors hover:text-white"
                >
                  {categoria.nombre}
                </Link>
              ))}
            </nav>
          </div>

          {/* Información desplegable */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-white">
              CONOCÉ MAXIMUS
            </h3>

            {/* Nuestra tienda */}
            <div className="border-b border-stone-700">
              <button
                type="button"
                onClick={() => setTiendaAbierta(!tiendaAbierta)}
                aria-expanded={tiendaAbierta}
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-stone-300 transition-colors hover:text-white"
              >
                Nuestra tienda
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    tiendaAbierta ? "rotate-180" : ""
                  }`}
                />
              </button>

              {tiendaAbierta && (
                <div className="flex gap-2 pb-4 text-sm leading-6 text-stone-300">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <p>
                    Joaquín V. González 460
                    <br />
                    Galería Santiago, locales 39 y 41
                    <br />
                    Floresta, CABA
                  </p>
                </div>
              )}
            </div>

            {/* Nosotros */}
            <div className="border-b border-stone-700">
              <button
                type="button"
                onClick={() => setNosotrosAbierto(!nosotrosAbierto)}
                aria-expanded={nosotrosAbierto}
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-stone-300 transition-colors hover:text-white"
              >
                Nosotros
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    nosotrosAbierto ? "rotate-180" : ""
                  }`}
                />
              </button>

              {nosotrosAbierto && (
                <p className="pb-4 text-sm leading-6 text-stone-300">
                  En MAXIMUS somos fabricantes directos de indumentaria
                  masculina en talles reales, especiales y grandes. Creamos
                  prendas cómodas, con buen calce y diseños pensados para
                  acompañarte todos los días. Talles del 6 al 14.
                </p>
              )}
            </div>
          </div>

          {/* Contacto y redes */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-white">
              CONTACTO
            </h3>

            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/5491140857998"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-stone-300 transition-colors hover:text-white"
              >
                <MessageCircle size={19} />
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:max.ventas.talles.reales@gmail.com"
                className="flex items-start gap-3 text-sm text-stone-300 transition-colors hover:text-white"
              >
                <Mail size={19} className="mt-0.5 shrink-0" />
                <span className="break-all">
                  max.ventas.talles.reales@gmail.com
                </span>
              </a>
            </div>

            <p className="mb-3 mt-7 text-xs font-semibold tracking-[0.14em] text-white">
              SEGUINOS
            </p>

            <div className="flex flex-wrap gap-3">
              {redes.map((red) =>
                red.href ? (
                  <a
                    key={red.nombre}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Seguir a MAXIMUS en ${red.nombre}`}
                    title={red.nombre}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition-colors hover:border-white hover:bg-white hover:text-black"
                  >
                    {red.icono}
                  </a>
                ) : (
                  <span
                    key={red.nombre}
                    title="Próximamente"
                    aria-label="TikTok, próximamente"
                    className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-stone-700 text-stone-400"
                  >
                    {red.icono}
                  </span>
                )
              )}
            </div>

            <p className="mt-3 text-xs text-stone-400">
              TikTok: próximamente
            </p>
          </div>
        </div>

        {/* Pie final */}
        <div className="mt-12 border-t border-stone-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-stone-400 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} MAXIMUS. Todos los derechos reservados.
            </p>
            <p>Indumentaria masculina · Talles del 6 al 14</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
