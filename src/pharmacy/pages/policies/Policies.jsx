const Policies = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-3xl font-bold text-[#80CC28] mb-6 text-center pb-2">
        <h1 className="mt-6 mb-6">Políticas</h1>
      </div>

      {/* Centered Video */}
      <div className="flex justify-center items-center mb-6">
        <video
          className="rounded-lg shadow-lg"
          width="864"
          height="480"
          controls
          loop
        >
          <source src="/video/politicas.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* Grid de tres columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Políticas de calidad */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-[#80CC28] mt-4 mb-6 text-center">
            Políticas de calidad
          </h2>
          <p className="mb-4">En Farmacia Cd del Sol, nos comprometemos a:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Garantizar la satisfacción de nuestros clientes mediante un
              servicio personalizado y eficiente.
            </li>
            <li>
              Capacitar a nuestro equipo de manera continua para asegurar el
              conocimiento y manejo adecuado de los productos que ofrecemos.
            </li>
            <li>
              Calidad de Productos: Cumplimos con las normativas de COFEPRIS y
              altos estándares de seguridad.
            </li>
            <li>
              Buenas Prácticas de Almacenamiento: Mantenemos productos en
              condiciones óptimas.
            </li>
            <li>
              Atención al Cliente: Servicio eficiente, personalizado y basado en
              la confianza.
            </li>
            <li>
              Cumplimiento de Normas ISO: Seguimos los principios de gestión de
              calidad ISO 9001.
            </li>
            <li>
              Capacitación Continua: Formación constante en temas de salud y
              atención al cliente.
            </li>
            <li>
              Mejora Continua: Revisamos procesos para implementar mejoras.
            </li>
          </ul>
        </div>

        {/* Políticas de privacidad */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-[#80CC28] mt-4 mb-6 text-center">
            Políticas de privacidad
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Responsable del Tratamiento de los Datos:</strong>{" "}
              Farmacia Cd del Sol, ubicada en Av. Moctezuma #456, Zapopan,
              Jalisco.
            </li>
            <li>
              <strong>Datos Recabados:</strong> Incluyen:
              <ul className="list-disc list-inside ml-4">
                <li>
                  Información personal: nombre, dirección, correo electrónico,
                  teléfono.
                </li>
                <li>
                  Datos relacionados con productos o servicios adquiridos.
                </li>
              </ul>
            </li>
            <li>
              <strong>Finalidad del Uso de Datos:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Proveer productos y servicios solicitados.</li>
                <li>Gestionar y procesar compras o entregas.</li>
                <li>Informar sobre promociones (si consiente).</li>
                <li>Cumplir con normativas legales.</li>
              </ul>
            </li>
            <li>
              <strong>Protección de Datos:</strong> Implementamos medidas de
              seguridad técnicas y organizativas.
            </li>
            <li>
              <strong>Derechos del Usuario:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Acceder, corregir o eliminar sus datos personales.</li>
                <li>Oponerse al uso de sus datos.</li>
              </ul>
              <p>
                Contacto:{" "}
                <a
                  href="mailto:protecciondedatos@farmaciacdsol.com"
                  className="text-blue-500 underline"
                >
                  protecciondedatos@farmaciacdsol.com
                </a>
              </p>
            </li>
            <li>
              <strong>Compartición de Datos:</strong> No compartimos datos,
              salvo por requerimientos legales.
            </li>
            <li>
              <strong>Modificaciones:</strong> Cambios disponibles en nuestro
              sitio web o locales.
            </li>
          </ol>
        </div>

        {/* Términos de uso */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold text-[#80CC28] mt-4 mb-6 text-center">
            Términos de uso
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <strong>Condiciones Generales:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Proporcionar información veraz y actualizada.</li>
                <li>No utilizar nuestros servicios para fines ilícitos.</li>
              </ul>
            </li>
            <li>
              <strong>Propiedad Intelectual:</strong> El contenido es propiedad
              de Farmacia Cd del Sol.
            </li>
            <li>
              <strong>Disponibilidad del Servicio:</strong> No garantizamos
              disponibilidad ininterrumpida.
            </li>
            <li>
              <strong>Limitación de Responsabilidad:</strong> No somos
              responsables por daños derivados del uso indebido de nuestros
              servicios.
            </li>
            <li>
              <strong>Legislación Aplicable:</strong> Leyes de México,
              jurisdicción en Zapopan, Jalisco.
            </li>
          </ol>
        </div>
      </div>

      {/* Fecha actualización */}
      <div className="text-center text-[#80CC28] mt-8">
        <p className="text-lg mb-2">
          Fecha de última actualización: 30/11/2024
        </p>
        <p className="text-lg">Para más información, contáctenos.</p>
      </div>
      <div className="h-12"></div>
    </div>
  );
};

export default Policies;
