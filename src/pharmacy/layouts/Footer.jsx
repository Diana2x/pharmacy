const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        {/* Logo y Título */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/images/logo.png" alt="logo" width={80} height={80} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Farmacias Ciudad del Sol
          </h1>
        </div>

        {/* Información de Ubicación y Horarios */}
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-semibold">Ubicación</h2>
          <p>
            Nos encontramos en una ubicación accesible dentro de la zona de Cd
            del Sol, Zapopan, Jalisco:
          </p>
          <p className="font-medium">Dirección:</p>
          <p>
            Avenida Moctezuma #456, Colonia Cd del Sol, Zapopan, Jalisco, C.P.
            45050
          </p>
          <p className="font-medium">Horarios:</p>
          <p>Lunes a Viernes: 9:00 AM – 8:00 PM</p>
          <p>Sábado: 9:00 AM – 2:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>

        {/* Enlaces a Políticas y Términos */}
        <div className="flex flex-col text-left mt-4 md:mt-0">
          <h3 className="text-lg font-semibold">Enlaces</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/politicas-de-privacidad" className="hover:underline">
                Políticas de Privacidad
              </a>
            </li>
            <li>
              <a href="/terminos-y-condiciones" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
