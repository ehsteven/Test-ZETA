import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cartItems } = useCart();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    MiTienda
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-gray-600 hover:text-blue-600">Productos</Link>
                    {isAuthenticated && user?.role === 'admin' && (
                        <Link href="/admin/products" className="text-gray-600 hover:text-blue-600">
                            Panel Admin
                        </Link>
                    )}
                    <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 opacity-50 pointer-events-none select-none">
                        Carrito
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Hola, {user.username}</span>
                            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4 opacity-50 pointer-events-none select-none">
                            <Link href="/login" className="text-gray-600 hover:text-blue-600">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;