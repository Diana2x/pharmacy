import { useEffect, useState } from "react";
import ImageGalleryComponent from "../../components/ImageGalleryComponent";
import ProductCard from "../../components/ProductCard";
import { GrNotes } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa";

const { VITE_API_URL } = import.meta.env;
import { getProducts } from "@/api/products/apiProducts";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch de productos
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col w-full p-2 sm:p-4 gap-4 sm:gap-6">
      {/* Contenedor flex para la galería de imágenes y el banner de salud */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mx-auto lg:flex-row container my-3 sm:my-6">
        {/* Image Gallery */}
        <div className="flex items-center justify-center w-full h-full mb-4 lg:mb-0">
          <ImageGalleryComponent />
        </div>
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg border-green-500">
          <img
            src="/images/consultorios.png"
            alt="Consultorios"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="w-full mx-auto flex flex-col items-center container mt-4 sm:mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 sm:mb-6 text-center border-b-4 border-green-500 pb-2">
          Productos Destacados
        </h2>
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="flex justify-center items-center my-4 sm:my-6 px-2 sm:px-4">
        <video
          className="rounded-lg shadow-lg border-green-500 border-2 sm:border-4 w-full"
          controls
          loop
          poster="/images/welcomeThumb.png"
          style={{ maxWidth: "864px" }}
        >
          <source src="/video/welcome.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* lista de información */}
      <div className="w-full mx-auto flex items-center justify-center container mt-6 sm:mt-10">
        <ul className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
          {/* Item 1 */}
          <li className="flex flex-col items-center text-center p-2">
            <GrNotes className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2" />
            <h2 className="font-semibold text-base sm:text-lg">Cambios y devoluciones</h2>
            <p className="text-xs sm:text-sm">
              Revisa Términos y condiciones y Política de privacidad.
            </p>
          </li>

          {/* Item 2 */}
          <li className="flex flex-col items-center text-center p-2">
            <FaCreditCard className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2" />
            <h2 className="font-semibold text-base sm:text-lg">Formas de Pago</h2>
            <p className="text-xs sm:text-sm">
              Distintas opciones de pago con total seguridad.
            </p>
          </li>

          {/* Item 3 */}
          <li className="flex flex-col items-center text-center p-2">
            <VscWorkspaceTrusted className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2" />
            <h2 className="font-semibold text-base sm:text-lg">Compra 100% segura</h2>
            <p className="text-xs sm:text-sm">Tus compras están totalmente protegidas.</p>
          </li>

          {/* Item 4 */}
          <li className="flex flex-col items-center text-center p-2">
            <IoChatboxEllipses className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2" />
            <h2 className="font-semibold text-base sm:text-lg">Centros de ayuda</h2>
            <p className="text-xs sm:text-sm">Contáctanos vía whatsapp 33-1514-9234.</p>
          </li>

          {/* Item 5 */}
          <li className="flex flex-col items-center text-center p-2 col-span-2 md:col-span-1">
            <FaFileInvoiceDollar className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2" />
            <h2 className="font-semibold text-base sm:text-lg">Facturación Electrónica</h2>
            <p className="text-xs sm:text-sm">
              Obtén tu factura electrónica de manera rápida y confiable.
            </p>
          </li>
        </ul>
      </div>

      {/* Calidad Banner */}
      <div className="w-full mx-auto flex flex-col items-center justify-center container mt-6 sm:mt-10 px-2 sm:px-4">
        <img
          src="/images/saludbanner.png"
          alt="Salud Banner"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default HomePage;
