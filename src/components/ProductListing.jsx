import ProductCard from "./ProductCard";

const ProductListing = ({ products = [] }) => {
    return (
        <div>
            {/* Cantidad */}
            <div className="mb-5">
                <p className="text-xs text-stone-500">
                    {products.length} productos
                </p>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-x-3
                        gap-y-9
                        md:grid-cols-3
                        md:gap-x-5
                        md:gap-y-12
                        lg:grid-cols-4
                        lg:gap-x-6
                    "
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p className="text-sm text-stone-500">
                        No hay productos que coincidan con los filtros.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductListing;