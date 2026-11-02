
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

const formatearPrecio = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(precio || 0));

const CartDrawer = ({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  subtotal = 0,
  totalItems = 0,
  wholesaleActive = false,
  remainingItems = 3,
  savings = 0,
  onCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Fondo oscuro */}
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/45"
      />

      {/* Panel lateral */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-stone-50 shadow-2xl sm:max-w-[390px]"
      >
        {/* Encabezado */}
        <header className="flex shrink-0 items-center justify-between border-b border-stone-300 px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-stone-950">
              Tu Carrito
            </h2>

            {totalItems > 0 && (
              <span className="text-xs text-stone-500">
                ({totalItems})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="flex h-8 w-8 items-center justify-center text-stone-600 transition-colors hover:text-stone-950"
          >
            <X size={19} strokeWidth={1.4} />
          </button>
        </header>

        {/* Lista de productos */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
              <ShoppingBag
                size={34}
                strokeWidth={1.2}
                className="text-stone-400"
              />

              <h3 className="mt-5 font-serif text-xl text-stone-900">
                Tu carrito está vacío
              </h3>

              <p className="mt-2 max-w-[250px] text-sm leading-6 text-stone-500">
                Descubrí nuestras prendas y encontrá tu próximo favorito.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 border-b border-stone-900 pb-1 text-sm text-stone-900"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <article
                  key={item.cartItemId ?? item.id}
                  className="flex gap-3 border-b border-stone-300 py-5"
                >
                  {/* Imagen */}
                  <div className="h-[88px] w-[76px] shrink-0 overflow-hidden bg-stone-200">
                    {item.imagen ? (
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag
                          size={22}
                          className="text-stone-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Información */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-medium leading-5 text-stone-900">
                        {item.nombre}
                      </h3>

                      <p className="shrink-0 text-xs text-stone-900">
                        {formatearPrecio(item.precioAplicado)}
                      </p>
                    </div>

                    <p className="mt-1 text-[11px] text-stone-500">
                      Talle {item.talle}
                      {item.color ? ` · ${item.color}` : ""}
                    </p>

                    {/* Cantidad */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex h-7 items-center border border-stone-300">
                        <button
                          type="button"
                          aria-label={`Disminuir cantidad de ${item.nombre}`}
                          disabled={item.cantidad <= 1 || !onUpdateQuantity}
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.cartItemId ?? item.id,
                              item.cantidad - 1
                            )
                          }
                          className="flex h-full w-7 items-center justify-center text-stone-600 disabled:opacity-30"
                        >
                          <Minus size={11} />
                        </button>

                        <span className="min-w-7 text-center text-[11px]">
                          {item.cantidad}
                        </span>

                        <button
                          type="button"
                          aria-label={`Aumentar cantidad de ${item.nombre}`}
                          disabled={
                            !onUpdateQuantity ||
                            item.cantidad >= Number(item.stock ?? Infinity)
                          }
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.cartItemId ?? item.id,
                              item.cantidad + 1
                            )
                          }
                          className="flex h-full w-7 items-center justify-center text-stone-600 disabled:opacity-30"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem?.(item.cartItemId ?? item.id)
                        }
                        disabled={!onRemoveItem}
                        className="text-[11px] text-stone-500 underline underline-offset-2 hover:text-stone-950 disabled:cursor-default"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Resumen inferior */}
        {items.length > 0 && (
          <footer className="shrink-0 border-t border-stone-300 bg-stone-50 px-5 pb-5 pt-4">
            {/* Promoción mayorista */}
            {wholesaleActive ? (
              <div className="mb-4 bg-stone-200/70 px-3 py-3">
                <p className="text-xs font-medium text-stone-900">
                  ¡Alcanzaste el precio mayorista!
                </p>

                <p className="mt-1 text-[11px] text-stone-600">
                  Promoción aplicada a todas tus prendas.
                </p>

                {savings > 0 && (
                  <p className="mt-1 text-xs font-medium text-stone-900">
                    Ahorrás {formatearPrecio(savings)}
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-[11px] text-stone-600">
                  {remainingItems === 1
                    ? "Te falta 1 prenda para acceder al precio mayorista."
                    : `Te faltan ${remainingItems} prendas para acceder al precio mayorista.`}
                </p>

                <div className="mt-2 h-1 w-full overflow-hidden bg-stone-200">
                  <div
                    className="h-full bg-stone-500 transition-all"
                    style={{
                      width: `${Math.min((totalItems / 3) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Subtotal</span>

              <span className="text-sm font-semibold text-stone-950">
                {formatearPrecio(subtotal)}
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-4 text-stone-500">
              El pedido se enviará por WhatsApp para confirmar stock,
              coordinar el pago y acordar el envío.
            </p>

            <button
              type="button"
              onClick={onCheckout}
              disabled={!onCheckout}
              className="mt-4 w-full bg-stone-900 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-100"
            >
              Finalizar compra
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
