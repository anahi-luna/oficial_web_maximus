import { Tag, Truck, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Tag,
    title: "PAGO POR TRANSFERENCIA",
    description: "Coordinás el pago directo por WhatsApp.",
  },
  {
    icon: Truck,
    title: "ENVÍOS A TODO EL PAÍS",
    description: "Recibilo donde estés, sin salir a buscar tu talle.",
  },
  {
    icon: CreditCard,
    title: "TALLES DE 6 AL 14",
    description: 'Patronaje real para cuerpos grandes.',
  },
];

const Benefits = () => {
  return (
    <section className="border-t border-stone-300 bg-stone-50">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className={`
              flex min-h-[125px] flex-col items-center justify-center
              px-6 py-8 text-center
              md:min-h-[150px] md:px-8 md:py-10
              ${
                index !== benefits.length - 1
                  ? "border-b border-stone-300 md:border-b-0 md:border-r"
                  : ""
              }
            `}
          >
            <Icon
              size={25}
              strokeWidth={1.5}
              className="mb-4 text-stone-900"
            />

            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-stone-900">
              {title}
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-stone-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;