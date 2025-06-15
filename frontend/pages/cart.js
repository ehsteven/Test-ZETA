import Layout from '../components/Layout';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
             <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Inicia sesión para ver tu carrito</h1>
                    <Link href="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                        Ir a Iniciar Sesión
                    </Link>
                </div>
             </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b py-4">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">${item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 text-right opacity-50 pointer-events-none select-none">
                        <h2 className="text-2xl font-bold">Total: ${cartTotal.toFixed(2)}</h2>
                         <button className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 font-semibold hover:bg-green-600">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}