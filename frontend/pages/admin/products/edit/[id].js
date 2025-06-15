import Layout from '../../../../components/Layout';
import ProductForm from '../../../../components/admin/ProductForm';
import api from '../../../../services/api';
import { useRouter } from 'next/router';

const EditProductPage = ({ product }) => {
    const router = useRouter();
    const { id } = router.query;

    const handleUpdateProduct = async (data) => {
        try {
            await api.put(`/products/${id}`, data);
            router.push('/admin/products');
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            alert('No se pudo actualizar el producto.');
        }
    };

    if (!product) return <p>Cargando...</p>;

    return (
            <Layout>
                <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
                <ProductForm onSubmit={handleUpdateProduct} initialData={product} />
            </Layout>
    );
};

export async function getServerSideProps({ params }) {
    try {
        const { data } = await api.get(`/products/${params.id}`);
        return { props: { product: data } };
    } catch (error) {
        return { notFound: true };
    }
}


export default EditProductPage;
