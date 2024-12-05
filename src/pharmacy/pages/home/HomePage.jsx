import React, { useEffect, useState } from "react";
import ImageGalleryComponent from "../../components/ImageGalleryComponent";
import ProductCard from "../../components/ProductCard";
import { GrNotes } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa";

const { VITE_API_URL } = import.meta.env;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch de productos
  useEffect(() => {
    fetch(`${VITE_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 5)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="flex flex-col w-full p-4 gap-6">
      {/* Contenedor flex para la galería de imágenes y el banner de salud */}
      <div className="flex items-center justify-center gap-6 mx-auto sm:flex-col lg:flex-row md:flex-col container m-6 max-h-[317px]">
        {/* Image Gallery */}
        <div className="flex items-center justify-center w-full h-full">
          <ImageGalleryComponent />
        </div>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg border-green-500">
          <img
            src="/images/consultorios.png"
            alt="Consultorios"
            className="w-full h-auto object-cover lg:h-[80%] max-h-[317px] rounded-lg"
          />
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="w-full mx-auto flex flex-col items-center container mt-6">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center border-b-4 border-green-500 pb-2">
          Productos Destacados
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mb-6 ">
        <video
          className="rounded-lg shadow-lg border-green-500 border-4 "
          width="864"
          height="480"
          controls
          loop
          poster="/images/welcomeThumb.png"
        >
          <source src="/video/welcome.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* lista de información */}
      <div className="w-full mx-auto flex items-center justify-center container mt-12">
        <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full">
          {/* Item 1 */}
          <li className="flex flex-col items-center text-center">
            <GrNotes className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg">Cambios y devoluciones</h2>
            <p className="text-sm">
              Revisa Términos y condiciones y Política de privacidad.
            </p>
          </li>

          {/* Item 2 */}
          <li className="flex flex-col items-center text-center">
            <FaCreditCard className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg">Formas de Pago</h2>
            <p className="text-sm">
              Distintas opciones de pago con total seguridad.
            </p>
          </li>

          {/* Item 3 */}
          <li className="flex flex-col items-center text-center ">
            <VscWorkspaceTrusted className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg">Compra 100% segura</h2>
            <p className="text-sm">Tus compras están totalmente protegidas.</p>
          </li>

          {/* Item 4 */}
          <li className="flex flex-col items-center text-center">
            <IoChatboxEllipses className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg">Centros de ayuda</h2>
            <p className="text-sm">Contáctanos vía whatsapp 33-1514-9234.</p>
          </li>

          {/* Item 5 */}
          <li className="flex flex-col items-center text-center">
            <FaFileInvoiceDollar className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg">Facturación Electrónica</h2>
            <p className="text-sm">
              Obtén tu factura electrónica de manera rápida y confiable.
            </p>
          </li>
        </ul>
      </div>

      {/* Calidad Banner */}
      <div className="w-full mx-auto flex flex-col items-center justify-center container mt-12">
        <img
          src="/images/saludbanner.png"
          alt="Salud Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default HomePage;
