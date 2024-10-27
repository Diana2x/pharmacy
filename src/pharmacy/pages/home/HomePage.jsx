import ImageGalleryComponent from "../../components/ImageGalleryComponent";
import { GrNotes } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full p-4 gap-3">
      {/* Contenedor flex para la galería de imágenes y el banner de salud */}
      <div className="flex items-center justify-center gap-3 mx-auto sm:flex-col lg:flex-row md:flex-col container m-4 max-h-[317px]">
        {/* Image Gallery */}
        <div className="flex items-center justify-center w-full h-full">
          <ImageGalleryComponent />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <img
            src="/images/consultorios.png"
            alt="Consultorios"
            className="w-full h-auto object-cover lg:h-[80%] max-h-[317px] rounded-lg"
          />
        </div>
      </div>

      {/* Calidad Banner */}
      <div className="w-full mx-auto flex flex-col items-center justify-center container">
        <img
          src="/images/saludbanner.png"
          alt="Salud Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      {/* lista de informacion */}
      <div className="w-full mx-auto flex items-center justify-center container mt-8">
        <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5  w-full">
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
    </div>
  );
};

export default HomePage;
