import { X } from "lucide-react";

const talles = [
  { label: "6", value: "6" },
  { label: "8", value: "8" },
  { label: "10", value: "10" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
];

const categorias = [
  { label: "Remeras", value: "remeras" },
  { label: "Camisas", value: "camisas" },
  { label: "Pantalones", value: "pantalones" },
  { label: "Abrigos", value: "abrigos" },
];

const colores = [
  { label: "Negro", value: "negro" },
  { label: "Verde Oliva", value: "verde oliva" },
  { label: "Chocolate", value: "chocolate" },
];

const precios = [
  { label: "Hasta $40.000", value: "hasta-40000" },
  { label: "$40.000 — $70.000", value: "40000-70000" },
];

const FiltersDrawer = ({
  isOpen,
  onClose,
  selectedFilters,
  onToggleFilter,
}) => {
  const renderCheckbox = (group, option) => {
    const checked = selectedFilters[group].includes(option.value);

    return (
      <label
        key={option.value}
        className="flex cursor-pointer items-center gap-3 text-sm text-stone-700"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggleFilter(group, option.value)}
          className="h-4 w-4 accent-stone-900"
        />

        <span>{option.label}</span>
      </label>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Fondo oscuro */}
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Panel */}
      <aside
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-[10000]
          max-h-[85vh]
          overflow-y-auto
          rounded-t-2xl
          bg-stone-50
          px-5
          pb-8
          pt-5
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-stone-300 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
              Filtrar productos
            </p>

            <h2 className="mt-1 font-serif text-2xl text-stone-950">
              Filtros
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-stone-300
              text-stone-900
            "
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Talles */}
        <div className="border-b border-stone-300 pb-6">
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            Talle
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {talles.map((option) =>
              renderCheckbox("talles", option)
            )}
          </div>
        </div>

        {/* Categoría */}
        <div className="border-b border-stone-300 py-6">
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            Categoría
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {categorias.map((option) =>
              renderCheckbox("categorias", option)
            )}
          </div>
        </div>

        {/* Color */}
        <div className="border-b border-stone-300 py-6">
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            Color
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {colores.map((option) =>
              renderCheckbox("colores", option)
            )}
          </div>
        </div>

        {/* Precio */}
        <div className="border-b border-stone-300 py-6">
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            Precio
          </h3>

          <div className="flex flex-col gap-3">
            {precios.map((option) =>
              renderCheckbox("precios", option)
            )}
          </div>
        </div>

        {/* Botón */}
        <button
          type="button"
          onClick={onClose}
          className="
            mt-6
            w-full
            bg-stone-900
            py-3.5
            text-sm
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
          "
        >
          Ver productos
        </button>
      </aside>
    </div>
  );
};

export default FiltersDrawer;