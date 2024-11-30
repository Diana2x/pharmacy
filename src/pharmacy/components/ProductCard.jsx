const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm border border-gray-200">
      {/* Product Image */}
      <div className="relative w-full h-48">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <p className="text-lg font-bold text-green-600 mt-4">
          ${product.price.toFixed(2)} MXN
        </p>
      </div>

      {/* Product Actions */}
      <div className="flex justify-between items-center mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Ver más
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
