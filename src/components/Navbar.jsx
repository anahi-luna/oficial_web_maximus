
import { Menu, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import ConfirmarPedidoModal from "./ConfirmarPedidoModal";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false);

  const checkoutPendienteRef = useRef(false);
  const salioDeLaTiendaRef = useRef(false);
  const confirmacionMostradaRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    items,
    totalItems,
    subtotal,
    wholesaleActive,
    remainingItems,
    savings,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Detectar cuándo el cliente sale de la tienda
  // y cuándo regresa después de iniciar el checkout.
  useEffect(() => {
    const detectarSalida = () => {
      if (
        checkoutPendienteRef.current &&
        document.visibilityState === "hidden"
      ) {
        salioDeLaTiendaRef.current = true;
      }
    };

    const detectarRegreso = () => {
      if (
        checkoutPendienteRef.current &&
        salioDeLaTiendaRef.current &&
        document.visibilityState === "visible" &&
        !confirmacionMostradaRef.current
      ) {
        confirmacionMostradaRef.current = true;
        setMostrarConfirmacion(true);
      }
    };

    const detectarPerdidaDeFoco = () => {
      if (checkoutPendienteRef.current) {
        salioDeLaTiendaRef.current = true;
      }
    };

    const detectarFoco = () => {
      detectarRegreso();
    };

    document.addEventListener(
      "visibilitychange",
      detectarSalida
    );
    document.addEventListener(
      "visibilitychange",
      detectarRegreso
    );
    window.addEventListener("blur", detectarPerdidaDeFoco);
    window.addEventListener("focus", detectarFoco);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        detectarSalida
      );
      document.removeEventListener(
        "visibilitychange",
        detectarRegreso
      );
      window.removeEventListener(
        "blur",
        detectarPerdidaDeFoco
      );
      window.removeEventListener("focus", detectarFoco);
    };
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const numeroWhatsApp = "5491140857998";

    const formatearPrecio = (precio) =>
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(Number(precio || 0));

    const detalleProductos = items
      .map((item) => {
        const subtotalProducto =
          Number(item.precioAplicado || 0) *
          item.cantidad;

        return [
          `• ${item.cantidad} x ${item.nombre}`,
          `  Talle: ${item.talle}`,
          item.color ? `  Color: ${item.color}` : null,
          `  Precio unitario: ${formatearPrecio(item.precioAplicado)}`,
          `  Subtotal: ${formatearPrecio(subtotalProducto)}`,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n");

    const mensaje = [
      "*PEDIDO MAXIMUS*",
      "",
      "¡Hola! Quiero realizar el siguiente pedido:",
      "",
      detalleProductos,
      "",
      "------------------------",
      `Total de prendas: ${totalItems}`,
      wholesaleActive
        ? "PROMOCIÓN MAYORISTA APLICADA"
        : "Precio minorista aplicado",
      `Total a pagar: ${formatearPrecio(subtotal)}`,
      wholesaleActive
        ? `Ahorro mayorista: ${formatearPrecio(savings)}`
        : null,
      "",
      "Quisiera confirmar el stock disponible y coordinar el pago y el envío.",
      "",
      "¡Gracias!",
    ]
      .filter((linea) => linea !== null)
      .join("\n");

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Preparar la detección del regreso.
    checkoutPendienteRef.current = true;
    salioDeLaTiendaRef.current = false;
    confirmacionMostradaRef.current = false;

    // No vaciar el carrito todavía.
    // El cliente deberá confirmar al volver a la tienda.
    window.open(url, "_blank");
  };

  const confirmarPedidoEnviado = () => {
    clearCart();

    checkoutPendienteRef.current = false;
    salioDeLaTiendaRef.current = false;
    confirmacionMostradaRef.current = false;

    setMostrarConfirmacion(false);
    setCartOpen(false);
  };

  const conservarCarrito = () => {
    checkoutPendienteRef.current = false;
    salioDeLaTiendaRef.current = false;
    confirmacionMostradaRef.current = false;

    setMostrarConfirmacion(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white">
        <nav className="mx-auto flex h-16 items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2"
            aria-label="Abrir menú"
          >
            <Menu size={20} strokeWidth={1.5} />
            <span className="hidden text-sm md:block">Menú</span>
          </button>


          <Link
            to="/"
            aria-label="MAXIMUS - Ir al inicio"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-wide text-stone-900"
          >
            MAXIMUS
          </Link>


          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Favoritos"
            >
              <Heart size={19} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label={`Abrir carrito, ${totalItems} prendas`}
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[9px] text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        totalItems={totalItems}
        subtotal={subtotal}
        wholesaleActive={wholesaleActive}
        remainingItems={remainingItems}
        savings={savings}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <ConfirmarPedidoModal
        isOpen={mostrarConfirmacion}
        onConfirmSent={confirmarPedidoEnviado}
        onKeepCart={conservarCarrito}
      />
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
