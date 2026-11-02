
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "maximus-cart";

const leerCarritoGuardado = () => {
    try {
        const guardado = localStorage.getItem(STORAGE_KEY);
        return guardado ? JSON.parse(guardado) : [];
    } catch {
        return [];
    }
};

const obtenerTotalPrendas = (items) =>
    items.reduce((total, item) => total + item.cantidad, 0);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(leerCarritoGuardado);

    // Guardamos el carrito para conservarlo al recargar.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("No se pudo guardar el carrito:", error);
        }
    }, [items]);

    const totalItems = useMemo(
        () => obtenerTotalPrendas(items),
        [items]
    );

    const wholesaleActive = totalItems >= 3;

    // Cada variante conserva su precio original.
    // El precio aplicado depende de la cantidad total del carrito.
    const itemsConPrecio = useMemo(
        () =>
            items.map((item) => ({
                ...item,
                precioAplicado: wholesaleActive
                    ? Number(item.precio_mayorista || item.precio || 0)
                    : Number(item.precio || 0),
            })),
        [items, wholesaleActive]
    );

    const subtotal = useMemo(
        () =>
            itemsConPrecio.reduce(
                (total, item) => total + item.precioAplicado * item.cantidad,
                0
            ),
        [itemsConPrecio]
    );

    const subtotalMinorista = useMemo(
        () =>
            items.reduce(
                (total, item) =>
                    total + Number(item.precio || 0) * item.cantidad,
                0
            ),
        [items]
    );

    const savings = wholesaleActive
        ? Math.max(0, subtotalMinorista - subtotal)
        : 0;

    const remainingItems = Math.max(0, 3 - totalItems);


    const addItem = useCallback(
        (producto, talle, color, cantidad = 1) => {
            const cantidadAgregar = Math.floor(Number(cantidad));

            if (
                !producto ||
                !talle ||
                (producto.colores?.length > 0 && !color) ||
                !Number.isFinite(cantidadAgregar) ||
                cantidadAgregar < 1
            ) {
                return {
                    ok: false,
                    message: "Revisá el talle, el color y la cantidad seleccionados.",
                };
            }

            const stock = Number(producto.stock || 0);

            if (stock <= 0) {
                return {
                    ok: false,
                    message: "Este producto no tiene stock disponible.",
                };
            }

            const cartItemId = `${producto.id}__${talle}__${color || ""}`;

            const cantidadDelProducto = items
                .filter((item) => String(item.id) === String(producto.id))
                .reduce((total, item) => total + item.cantidad, 0);

            if (cantidadDelProducto + cantidadAgregar > stock) {
                return {
                    ok: false,
                    message: `Solo hay ${Math.max(
                        0,
                        stock - cantidadDelProducto
                    )} unidades disponibles para este producto.`,
                };
            }

            const existente = items.find(
                (item) => item.cartItemId === cartItemId
            );

            if (existente) {
                setItems((actuales) =>
                    actuales.map((item) =>
                        item.cartItemId === cartItemId
                            ? {
                                ...item,
                                cantidad: item.cantidad + cantidadAgregar,
                            }
                            : item
                    )
                );

                return { ok: true, message: "Cantidad actualizada." };
            }

            const imagen = producto.imagen_url
                ? producto.imagen_url
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean)[0] || ""
                : "";

            setItems((actuales) => [
                ...actuales,
                {
                    cartItemId,
                    id: producto.id,
                    nombre: producto.nombre,
                    imagen,
                    talle,
                    color: color || "",
                    cantidad: cantidadAgregar,
                    precio: Number(producto.precio || 0),
                    precio_mayorista: Number(
                        producto.precio_mayorista || producto.precio || 0
                    ),
                    stock,
                },
            ]);

            return { ok: true, message: "Producto agregado al carrito." };
        },
        [items]
    );


    const updateQuantity = useCallback((cartItemId, nuevaCantidad) => {
        const cantidad = Math.floor(Number(nuevaCantidad));

        if (!Number.isFinite(cantidad) || cantidad < 1) return;

        setItems((actuales) => {
            const itemObjetivo = actuales.find(
                (item) => item.cartItemId === cartItemId
            );

            if (!itemObjetivo) return actuales;

            const otrasUnidadesDelProducto = actuales
                .filter(
                    (item) =>
                        String(item.id) === String(itemObjetivo.id) &&
                        item.cartItemId !== cartItemId
                )
                .reduce((total, item) => total + item.cantidad, 0);

            const maximoPermitido = Math.max(
                0,
                itemObjetivo.stock - otrasUnidadesDelProducto
            );

            const cantidadFinal = Math.min(cantidad, maximoPermitido);

            if (cantidadFinal < 1) return actuales;

            return actuales.map((item) =>
                item.cartItemId === cartItemId
                    ? { ...item, cantidad: cantidadFinal }
                    : item
            );
        });
    }, []);

    const removeItem = useCallback((cartItemId) => {
        setItems((actuales) =>
            actuales.filter((item) => item.cartItemId !== cartItemId)
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const value = {
        items: itemsConPrecio,
        totalItems,
        subtotal,
        subtotalMinorista,
        savings,
        wholesaleActive,
        remainingItems,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe utilizarse dentro de CartProvider.");
    }

    return context;
};
