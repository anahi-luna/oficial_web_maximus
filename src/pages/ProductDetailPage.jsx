import { useEffect, useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { fetchProductos } from "../services/apiService";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addItem } = useCart();

    const [producto, setProducto] = useState(null);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
    const [talleSeleccionado, setTalleSeleccionado] = useState("");
    const [colorSeleccionado, setColorSeleccionado] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    const [seccionesAbiertas, setSeccionesAbiertas] = useState({
        descripcion: true,
        guia: true,
        envios: false,
    });

    useEffect(() => {
        const cargarProductos = async () => {
            setCargando(true);
            setError("");

            const data = await fetchProductos();

            const productoEncontrado = data.find(
                (item) => String(item.id) === String(id)
            );

            if (!productoEncontrado) {
                setError("No encontramos este producto.");
                setProducto(null);
                setProductos([]);
            } else {
                setProducto(productoEncontrado);
                setProductos(data);
            }

            setCargando(false);
        };

        cargarProductos();
    }, [id]);

    const imagenes = useMemo(() => {
        if (!producto?.imagen_url) return [];

        return producto.imagen_url
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean);
    }, [producto]);

    const productosRelacionados = useMemo(() => {
        if (!producto) return [];

        return productos
            .filter((item) => String(item.id) !== String(producto.id))
            .slice(0, 4);
    }, [productos, producto]);

    const precioFormateado = useMemo(() => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }).format(Number(producto?.precio || 0));
    }, [producto]);

    const toggleSeccion = (seccion) => {
        setSeccionesAbiertas((prev) => ({
            ...prev,
            [seccion]: !prev[seccion],
        }));
    };

    const aumentarCantidad = () => {
        if (cantidad < Number(producto.stock || 0)) {
            setCantidad((prev) => prev + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad((prev) => prev - 1);
        }
    };

    const validarProducto = () => {
        if (producto.talles?.length > 0 && !talleSeleccionado) {
            setMensajeValidacion("Seleccioná un talle para continuar.");
            return false;
        }

        if (producto.colores?.length > 0 && !colorSeleccionado) {
            setMensajeValidacion("Seleccioná un color para continuar.");
            return false;
        }

        if (Number(producto.stock || 0) <= 0) {
            setMensajeValidacion("Este producto no tiene stock disponible.");
            return false;
        }

        setMensajeValidacion("");
        return true;
    };


    const handleAgregarCarrito = () => {
        if (producto.talles?.length > 0 && !talleSeleccionado) {
            setMensajeValidacion("Seleccioná un talle para continuar.");
            return;
        }

        if (producto.colores?.length > 0 && !colorSeleccionado) {
            setMensajeValidacion("Seleccioná un color para continuar.");
            return;
        }

        if (Number(producto.stock || 0) <= 0) {
            setMensajeValidacion("Este producto no tiene stock disponible.");
            return;
        }

        const resultado = addItem(
            producto,
            talleSeleccionado,
            colorSeleccionado,
            cantidad
        );

        if (!resultado.ok) {
            setMensajeValidacion(resultado.message);
            return;
        }

        setMensajeValidacion("");
        setCantidad(1);
        setMensajeValidacion("¡Producto agregado al carrito!");
    };


    if (cargando) {
        return (
            <main className="min-h-[70vh] bg-stone-50 px-5 py-20">
                <p className="text-center text-sm text-stone-500">
                    Cargando producto...
                </p>
            </main>
        );
    }

    if (error || !producto) {
        return (
            <main className="min-h-[70vh] bg-stone-50 px-5 py-20">
                <div className="mx-auto max-w-xl text-center">
                    <p className="text-sm text-stone-500">
                        {error || "Producto no encontrado."}
                    </p>

                    <Link
                        to="/productos"
                        className="mt-5 inline-block border-b border-stone-900 pb-1 text-sm text-stone-900"
                    >
                        Volver a productos
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-stone-50">
            {/* Volver + breadcrumb */}
            <div className="border-b border-stone-200">
                <div className="flex items-center justify-between px-5 py-4 md:px-8">
                    <Link
                        to="/productos"
                        className="text-sm text-stone-700 transition-opacity hover:opacity-60"
                    >
                        ← Volver
                    </Link>

                    <p className="text-[11px] text-stone-500">
                        Maximus · Hombre · {producto.categoria}
                    </p>
                </div>
            </div>

            {/* PRODUCTO */}
            <section className="mx-auto max-w-[1180px] px-4 md:px-8 lg:px-10">
                <div className="grid lg:grid-cols-[52%_48%]">
                    {/* GALERÍA */}
                    <section className="lg:pr-12">
                        <div className="flex flex-col gap-2 md:flex-row">
                            {/* Miniaturas desktop */}
                            {imagenes.length > 1 && (
                                <div className="hidden w-[70px] shrink-0 flex-col gap-2 md:flex">
                                    {imagenes.map((imagen, index) => (
                                        <button
                                            key={`${imagen}-${index}`}
                                            type="button"
                                            onClick={() => setImagenSeleccionada(index)}
                                            className={`aspect-[3/4] w-full overflow-hidden border ${imagenSeleccionada === index
                                                ? "border-stone-900"
                                                : "border-transparent"
                                                }`}
                                        >
                                            <img
                                                src={imagen}
                                                alt={`${producto.nombre} ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Imagen principal */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 md:aspect-auto md:h-[calc(680px)]">
                                {imagenes.length > 0 ? (
                                    <img
                                        src={imagenes[imagenSeleccionada]}
                                        alt={producto.nombre}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-stone-400">
                                        Sin imagen
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Miniaturas mobile */}
                        {imagenes.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
                                {imagenes.map((imagen, index) => (
                                    <button
                                        key={`${imagen}-mobile-${index}`}
                                        type="button"
                                        onClick={() => setImagenSeleccionada(index)}
                                        className={`h-20 w-16 shrink-0 overflow-hidden border ${imagenSeleccionada === index
                                            ? "border-stone-900"
                                            : "border-transparent"
                                            }`}
                                    >
                                        <img
                                            src={imagen}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* INFORMACIÓN */}
                    <section className="py-8 md:py-10 lg:pl-4 lg:pt-10">
                        {/* SKU */}
                        <p className="text-[10px] uppercase tracking-[0.16em] text-stone-500">
                            SKU {producto.id}
                        </p>

                        {/* Nombre */}
                        <h1 className="mt-3 max-w-xl font-serif text-3xl leading-[1.08] text-stone-950 md:text-4xl">
                            {producto.nombre}
                        </h1>

                        {/* Precio */}
                        <p className="mt-4 text-base text-stone-900 md:text-lg">
                            {precioFormateado}
                        </p>

                        {/* Talles */}
                        {producto.talles?.length > 0 && (
                            <div className="mt-8">
                                <p className="mb-3 text-xs font-semibold text-stone-900">
                                    Talle
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {producto.talles.map((talle) => {
                                        const seleccionado = talleSeleccionado === talle;

                                        return (
                                            <button
                                                key={talle}
                                                type="button"
                                                onClick={() => {
                                                    setTalleSeleccionado(talle);
                                                    setMensajeValidacion("");
                                                }}
                                                className={`min-w-[48px] border px-4 py-2.5 text-xs transition-colors ${seleccionado
                                                    ? "border-stone-900 bg-stone-900 text-white"
                                                    : "border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900"
                                                    }`}
                                            >
                                                {talle}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {producto.colores?.length > 0 && (
                            <div className="mt-7">
                                <p className="mb-3 text-xs font-semibold text-stone-900">
                                    Color
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {producto.colores.map((color) => {
                                        const seleccionado = colorSeleccionado === color;

                                        return (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => {
                                                    setColorSeleccionado(color);
                                                    setMensajeValidacion("");
                                                }}
                                                className={`border px-4 py-2.5 text-xs capitalize transition-colors ${seleccionado
                                                    ? "border-stone-900 bg-stone-900 text-white"
                                                    : "border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="mt-7">
                            <p className="mb-3 text-xs font-semibold text-stone-900">
                                Cantidad
                            </p>

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={disminuirCantidad}
                                    disabled={cantidad <= 1}
                                    className="flex h-11 w-11 items-center justify-center border border-stone-300 text-stone-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Disminuir cantidad"
                                >
                                    −
                                </button>

                                <div className="flex h-11 w-14 items-center justify-center border-y border-stone-300 text-sm">
                                    {cantidad}
                                </div>

                                <button
                                    type="button"
                                    onClick={aumentarCantidad}
                                    disabled={cantidad >= Number(producto.stock || 0)}
                                    className="flex h-11 w-11 items-center justify-center border border-stone-300 text-stone-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-stone-500">
                                {Number(producto.stock || 0) > 0
                                    ? `${producto.stock} unidades disponibles`
                                    : "Sin stock"}
                            </p>
                        </div>

                        {/* Agregar al carrito */}
                        <button
                            type="button"
                            onClick={handleAgregarCarrito}
                            disabled={Number(producto.stock || 0) <= 0}
                            className="mt-7 w-full bg-stone-900 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-stone-300"
                        >
                            {Number(producto.stock || 0) > 0
                                ? "Agregar al carrito"
                                : "Sin stock"}
                        </button>

                        {mensajeValidacion && (
                            <p
                                role="status"
                                className={`mt-3 text-xs ${mensajeValidacion.startsWith("¡")
                                        ? "text-green-700"
                                        : "text-red-700"
                                    }`}
                            >
                                {mensajeValidacion}
                            </p>
                        )}

                        {/* Envío */}
                        <p className="mt-3 text-xs text-stone-500">
                            Retiro en tienda o envío a todo el país.
                        </p>

                        {/* Acordeones */}
                        <div className="mt-7 border-t border-stone-300">
                            {/* Descripción */}
                            <div className="border-b border-stone-300">
                                <button
                                    type="button"
                                    onClick={() => toggleSeccion("descripcion")}
                                    className="flex w-full items-center justify-between py-5 text-left"
                                >
                                    <span className="text-sm text-stone-900">
                                        Descripción
                                    </span>

                                    {seccionesAbiertas.descripcion ? (
                                        <Minus size={15} strokeWidth={1.4} />
                                    ) : (
                                        <Plus size={15} strokeWidth={1.4} />
                                    )}
                                </button>

                                {seccionesAbiertas.descripcion && (
                                    <div className="pb-5 text-sm leading-6 text-stone-600">
                                        {producto.descripcion || (
                                            <p>
                                                Prenda diseñada para ofrecer comodidad y un calce
                                                pensado para cuerpos grandes.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Guía de talles */}
                            <div className="border-b border-stone-300">
                                <button
                                    type="button"
                                    onClick={() => toggleSeccion("guia")}
                                    className="flex w-full items-center justify-between py-5 text-left"
                                >
                                    <span className="text-sm text-stone-900">
                                        Guía de talles
                                    </span>

                                    {seccionesAbiertas.guia ? (
                                        <Minus size={15} strokeWidth={1.4} />
                                    ) : (
                                        <Plus size={15} strokeWidth={1.4} />
                                    )}
                                </button>

                                {seccionesAbiertas.guia && (
                                    <div className="pb-5 text-sm leading-6 text-stone-600">
                                        Todas nuestras prendas están patronadas desde cero para
                                        cuerpos grandes, no son talles "extendidos" de una
                                        colección chica.
                                    </div>
                                )}
                            </div>

                            {/* Envíos y cambios */}
                            <div className="border-b border-stone-300">
                                <button
                                    type="button"
                                    onClick={() => toggleSeccion("envios")}
                                    className="flex w-full items-center justify-between py-5 text-left"
                                >
                                    <span className="text-sm text-stone-900">
                                        Envíos y cambios
                                    </span>

                                    {seccionesAbiertas.envios ? (
                                        <Minus size={15} strokeWidth={1.4} />
                                    ) : (
                                        <Plus size={15} strokeWidth={1.4} />
                                    )}
                                </button>

                                {seccionesAbiertas.envios && (
                                    <div className="pb-5 text-sm leading-6 text-stone-600">
                                        Realizamos envíos a todo el país. Los cambios están
                                        sujetos a las condiciones informadas por Maximus.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {/* COMBINA CON */}
            {productosRelacionados.length > 0 && (
                <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28 lg:px-10">
                    <div className="mb-8 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
                            También te puede interesar
                        </p>

                        <h2 className="mt-2 font-serif text-3xl text-stone-950 md:text-4xl">
                            Combina con
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
                        {productosRelacionados.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetailPage;