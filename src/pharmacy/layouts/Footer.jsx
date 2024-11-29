import React from "react";
import { FaFacebook, FaInstagram, FaXTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Sección Mapa/Ubicación */}
        <div className="flex flex-col text-center">
          <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
          <div className="mb-4" style={{ width: "100%", height: "200px" }}>
            <iframe
              title="Mapa de Google"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.1234567890123!2d-103.4105!3d20.65427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b18a1a1a1a1b%3A0x1a2b3c4d5e6f7g8h!2sAv%20Xochitl%20311%2C%20Prados%20Tepeyac%2C%2045050%20Zapopan%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1633351062904!5m2!1ses!2smx"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <p>Av Xochitl 311, Prados Tepeyac, 45050 Zapopan, Jal., México</p>
        </div>

        {/* Sección Ayuda */}
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
          <ul className="space-y-2 text-left">
            <li>
              <a href="/faq" className="hover:underline">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="/contacto" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Sección Empresa */}
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold mb-4">Empresa</h3>
          <ul className="space-y-2">
            <li>
              <a href="/quienes-somos" className="hover:underline">
                ¿Quiénes somos?
              </a>
            </li>
            <li>
              <a href="/mision-vision" className="hover:underline">
                Misión y Visión
              </a>
            </li>
          </ul>
        </div>

        {/* Sección Políticas */}
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold mb-4">Políticas</h3>
          <ul className="space-y-2">
            <li>
              <a href="/politicas-de-calidad" className="hover:underline">
                Políticas de Calidad
              </a>
            </li>
            <li>
              <a href="/aviso-de-privacidad" className="hover:underline">
                Aviso de Privacidad
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales y Métodos de Pago */}
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
          <div className="flex space-x-4 mb-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-700"
            >
              <FaInstagram className="text-pink-500 hover:text-pink-700 text-3xl" />
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <FaFacebook className="text-blue-500 hover:text-blue-700 text-3xl" />
            </a>
            {/* Twitter ahora X */}
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600"
            >
              <FaXTwitter className="text-black-400 hover:text-gray-600 text-3xl" />
            </a>
          </div>
          <h3 className="text-lg font-semibold mb-4">Métodos de Pago</h3>
          <div className="flex space-x-4">
            {/* Visa */}
            <FaCcVisa className="text-blue-700 text-4xl" title="Visa" />
            {/* MasterCard */}
            <FaCcMastercard className="text-red-400 text-4xl" title="MasterCard" />
            {/* PayPal */}
            <FaCcPaypal className="text-blue-400 text-4xl" title="PayPal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
