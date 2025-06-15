import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage({ initialData }) {
    const router = useRouter();
    const { search = '', page = 1 } = router.query;

    // Estado controlado para el input
    const [searchTerm, setSearchTerm] = useState(search);
    // Estado para productos y paginación
    const [products, setProducts] = useState(initialData.products);
    const [totalPages, setTotalPages] = useState(initialData.totalPages);
    const [loading, setLoading] = useState(false);

    // Cuando cambia la query, cargar productos nuevos
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?search=${search}&page=${page}`);
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error cargando productos:', error);
                setProducts([]);
                setTotalPages(0);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [search, page]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        // Cambiar la URL (con page = 1)
        router.push(`/?search=${term}&page=1`, undefined, { shallow: true });
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Nuestros Productos</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre o categoría..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => router.push(`/?search=${search}&page=${p}`, undefined, { shallow: true })}
                                className={`mx-1 px-4 py-2 rounded ${
                                    Number(page) === p ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const { search = '', page = 1 } = query;
    try {
        const { data } = await api.get(`/products?search=${search}&page=${page}`);
        return { props: { initialData: data } };
    } catch (error) {
        console.error("Failed to fetch products", error);
        return { props: { initialData: { products: [], totalPages: 0, currentPage: 1 } } };
    }
}
