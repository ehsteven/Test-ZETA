import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        addToCart(product);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img src={product.image_url || 'https://placehold.co/600x400'} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-1 truncate">{product.description}</p>
                <p className="text-gray-600 mt-1 truncate">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;