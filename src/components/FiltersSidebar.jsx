import { useMemo } from "react";

const normalizarTexto = (texto = "") => {
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

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

const FiltersSidebar = ({
  selectedFilters,
  onToggleFilter,
}) => {
  const filtrosActivos = useMemo(() => {
    return (
      selectedFilters.talles.length +
      selectedFilters.categorias.length +
      selectedFilters.colores.length +
      selectedFilters.precios.length
    );
  }, [selectedFilters]);

  const renderCheckbox = (group, option) => {
    const checked = selectedFilters[group].includes(option.value);

    return (
      <label
        key={option.value}
        className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggleFilter(group, option.value)}
          className="h-3.5 w-3.5 accent-stone-900"
        />

        <span>{option.label}</span>
      </label>
    );
  };

  return (
    <aside className="w-full shrink-0 lg:w-[205px]">
      {/* Talle */}
      <div className="border-b border-stone-300 pb-6">
        <h2 className="mb-3 text-sm font-semibold text-stone-900">
          Talle
        </h2>

        <div className="flex flex-col gap-2.5">
          {talles.map((option) =>
            renderCheckbox("talles", option)
          )}
        </div>
      </div>

      {/* Categoría */}
      <div className="border-b border-stone-300 py-6">
        <h2 className="mb-3 text-sm font-semibold text-stone-900">
          Categoría
        </h2>

        <div className="flex flex-col gap-2.5">
          {categorias.map((option) =>
            renderCheckbox("categorias", option)
          )}
        </div>
      </div>

      {/* Color */}
      <div className="border-b border-stone-300 py-6">
        <h2 className="mb-3 text-sm font-semibold text-stone-900">
          Color
        </h2>

        <div className="flex flex-col gap-2.5">
          {colores.map((option) =>
            renderCheckbox("colores", option)
          )}
        </div>
      </div>

      {/* Precio */}
      <div className="border-b border-stone-300 py-6">
        <h2 className="mb-3 text-sm font-semibold text-stone-900">
          Precio
        </h2>

        <div className="flex flex-col gap-2.5">
          {precios.map((option) =>
            renderCheckbox("precios", option)
          )}
        </div>
      </div>

      {/* Indicador */}
      {filtrosActivos > 0 && (
        <p className="pt-4 text-xs text-stone-500">
          {filtrosActivos}{" "}
          {filtrosActivos === 1
            ? "filtro seleccionado"
            : "filtros seleccionados"}
        </p>
      )}
    </aside>
  );
};

export default FiltersSidebar;