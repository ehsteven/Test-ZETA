import Layout from '../../../components/Layout';
import ProductForm from '../../../components/admin/ProductForm';
import api from '../../../services/api';
import { useRouter } from 'next/router';

const NewProductPage = () => {
    const router = useRouter();

    const handleCreateProduct = async (data) => {
        try {
            await api.post('/products', data);
            router.push('/admin/products');
        } catch (error) {
            console.error('Error al crear el producto', error);
            alert('No se pudo crear el producto.');
        }
    };
    
    return (
            <Layout>
                <h1 className="text-3xl font-bold mb-6">Crear Nuevo Producto</h1>
                <ProductForm onSubmit={handleCreateProduct} />
            </Layout>
    );
};

export default NewProductPage;