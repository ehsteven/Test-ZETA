import Layout from '../../../components/Layout';
import api from '../../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminProductsPage = ({ products }) => {
    const router = useRouter();

    const handleDelete = async (productId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await api.delete(`/products/${productId}`);
                router.replace(router.asPath); // Recargar datos
            } catch (error) {
                console.error('Error al eliminar producto', error);
                alert('No se pudo eliminar el producto.');
            }
        }
    };

    return (
            <Layout>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Gestionar Productos</h1>
                    <Link href="/admin/products/new" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Crear Producto
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">${product.price}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{product.stock}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <Link href={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
    );
};


export async function getServerSideProps(context) {
     try {
        const { data } = await api.get('/products?limit=100'); // Traer todos para el admin
        return { props: { products: data.products } };
    } catch (error) {
        return { props: { products: [] } };
    }
}

export default AdminProductsPage;