const AboutUs = () => {
  return (
    <div className="mx-[16.6667%]">
    <div className="text-3xl font-bold text-[#80CC28] mb-6 text-center pb-2">
      <h1 className="mt-6 mb-6">¿Quiénes somos?</h1>
    </div>
    {/* Introducción */}
    <div className="text-center my-8">
      <img src="/images/logo.png" alt="Logo" className="mx-auto mb-4 lg:h-[60%] max-h-[158px]" />
      <h2 className="text-[#80CC28] text-2xl font-semibold">Farmacias Ciudad del Sol</h2>
      <p className="text-gray-700 mt-4 text-left px-4">
        En Farmacia Cd del Sol, ubicada en Zapopan, Jalisco, contamos con más de 20 años de experiencia ofreciendo una amplia variedad de medicamentos. Nuestro compromiso es brindar un servicio personalizado y de calidad, respaldado por la confianza y lealtad de nuestra clientela.
      </p>
    </div>
    {/* Nuestra historia */}
    <div className="bg-[#FFE476] py-8 w-full">
      <h2 className="text-[#414141] text-2xl font-semibold text-center mb-4">Nuestra Historia</h2>
      <p className="text-gray-800 text-left mb-6 px-4">
        Farmacia Cd del Sol nació como un sueño familiar con el propósito de ofrecer servicios farmacéuticos de calidad a nuestra comunidad. Con el paso de los años, hemos crecido y evolucionado, siempre manteniendo los valores de cercanía y confianza que nos caracterizan.
      </p>
      {/* Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <img src="/images/camino.png" alt="" className="w-full h-auto object-cover lg:h-[100%] max-h-[1500px]" />
        <img src="/images/familia.png" alt="" className="w-full h-auto object-cover lg:h-[100%] max-h-[300px]" />
        <img src="/images/crecimiento.png" alt="" className="w-full h-auto object-cover lg:h-[100%] max-h-[300px]" />
      </div>
    </div>
    {/* Tarjeta con secciones */}
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
      {/* Sección 1 */}
      <div className="text-center mb-8">
        <img src="/images/valores.png" alt="Valores" className="mx-auto mb-4 lg:h-[60%] max-h-[317px]" />
        <h2 className="text-[#80CC28] text-2xl font-semibold">Nuestros valores</h2>
        <p className="text-gray-700 mt-4">
          En Farmacia Cd del Sol, nos guiamos por principios que reflejan nuestro compromiso con la comunidad.
        </p>
      </div>
      {/* Sección 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <img src="/images/compromiso.png" alt="Compromiso" className="mx-auto mb-4 lg:h-[60%] max-h-[218px]" />
          <h3 className="font-bold text-lg text-gray-800">Compromiso</h3>
          <p className="text-gray-600">Estamos dedicados a proporcionar un servicio de excelencia.</p>
        </div>
        <div className="text-center">
          <img src="/images/calidad.png" alt="Calidad" className="mx-auto mb-4 lg:h-[60%] max-h-[218px]" />
          <h3 className="font-bold text-lg text-gray-800">Calidad</h3>
          <p className="text-gray-600">
            Garantizamos la entrega de productos certificados y servicios que cumplen con los estándares más altos.
          </p>
        </div>
        <div className="text-center">
          <img src="/images/atencion.png" alt="Atención" className="mx-auto mb-4 lg:h-[60%] max-h-[218px]" />
          <h3 className="font-bold text-lg text-gray-800">Atención personalizada</h3>
          <p className="text-gray-600">
            Valoramos el contacto humano y nos esforzamos por conocer y atender a cada cliente con respeto y empatía.
          </p>
        </div>
      </div>
      {/* Sección 3 */}
      <div>
        <p className="text-gray-700 mx-auto leading-relaxed">
          Estos valores son el motor que nos impulsa a ser la farmacia de referencia en nuestra comunidad y un apoyo constante para las familias de Zapopan y sus alrededores.
        </p>
      </div>
    </div>
   <div className="h-12"></div>
  </div>
  );
};

export default AboutUs;
