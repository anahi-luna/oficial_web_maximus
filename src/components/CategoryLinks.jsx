
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Remeras y Musculosas",
    target: "/productos?categoria=remeras",
  },
  {
    name: "Camisas",
    target: "/productos?categoria=camisas",
  },
  {
    name: "Pantalones y Joggers",
    target: "/productos?categoria=pantalones",
  },
  {
    name: "Camperas",
    target: "/productos?categoria=abrigos",
  },
];

const CategoryLinks = () => {
  return (
    <section className="grid grid-cols-2 border-b border-stone-200 bg-stone-50 md:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.target}
          className="
            group
            flex
            min-h-[78px]
            items-center
            justify-between
            border-b
            border-r
            border-stone-200
            px-5
            text-left
            text-sm
            text-stone-900
            transition-colors
            hover:bg-stone-100
            md:min-h-[68px]
            md:border-b-0
            md:px-5
            lg:px-7
          "
        >
          <span>{category.name}</span>

          <span
            className="
              ml-3
              text-base
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </Link>
      ))}
    </section>
  );
};

export default CategoryLinks;
