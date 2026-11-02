
const ConfirmarPedidoModal = ({
  isOpen,
  onConfirmSent,
  onKeepCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmar-pedido-titulo"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-800"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
        </div>

        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          MAXIMUS
        </p>

        <h2
          id="confirmar-pedido-titulo"
          className="mb-3 text-center text-2xl font-semibold text-stone-900"
        >
          ¿Enviaste tu pedido?
        </h2>

        <p className="mb-7 text-center text-sm leading-6 text-stone-600">
          Se abrió WhatsApp con el detalle de tu compra.
          Queremos saber si ya enviaste el mensaje para
          continuar con tu pedido.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onConfirmSent}
            className="w-full rounded-lg bg-stone-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Sí, ya envié mi pedido
          </button>

          <button
            type="button"
            onClick={onKeepCart}
            className="w-full rounded-lg border border-stone-300 px-5 py-3.5 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            Todavía no, conservar mi carrito
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-stone-400">
          Recordá que el pedido se confirma con nuestro equipo por WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default ConfirmarPedidoModal;
