import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el id del producto desde la URL
import ProductDetail from "../../components/ProductDetail";

const ProductPage = () => {
  const { id } = useParams(); // Usamos el id del producto de la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulamos la obtención de un producto por id
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductPage;
