import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, initialData = {} }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre del Producto</label>
                <input
                    {...register('name', { required: 'El nombre es obligatorio' })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea
                    {...register('description')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">Precio</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'El precio es obligatorio', valueAsNumber: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
                 <div>
                    <label className="block text-gray-700 mb-2">Stock</label>
                    <input
                        type="number"
                        {...register('stock', { required: 'El stock es obligatorio', valueAsNumber: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                </div>
            </div>
             <div className="mb-4">
                <label className="block text-gray-700 mb-2">Categoría</label>
                <input
                    {...register('category')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">URL de la Imagen</label>
                <input
                    {...register('image_url')}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
                {initialData.id ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
        </form>
    );
};

export default ProductForm;