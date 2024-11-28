const MissionVision = () => {
    return (
        <div className="space-y-12">
        <div className="text-3xl font-bold text-[#80CC28] mb-6 text-center pb-2">
          <h1 className="mt-6 mb-6">Misión y Visión</h1>
        </div>
      
        {/* Sección Misión */}
        <div className="relative flex items-center bg-[#FCE06F] rounded-r-full w-2/3 mr-auto p-6">
          <div className="flex flex-col justify-center">
            <h2 className="text-[#414141] text-2xl font-semibold mb-4 text-center">Misión</h2>
            <p className="text-gray-800 text-center">
              Proporcionar productos farmacéuticos de calidad con un servicio excepcional, enfocado en el bienestar de
              nuestros clientes. Nuestra misión es facilitar el acceso a medicamentos y productos de salud a través de
              un trato personalizado y un servicio confiable, cubriendo las necesidades de nuestros usuarios tanto en
              nuestra farmacia física como en el entorno digital.
            </p>
          </div>
          <img
            src="/images/mision.png"
            alt="Misión"
            className="w-32 h-32 object-cover rounded-full ml-6"
          />
        </div>
      
        {/* Sección Visión */}
        <div className="relative flex items-center bg-[#80CC28] rounded-l-full w-2/3 ml-auto p-6">
          <img
            src="/images/vision.png"
            alt="Visión"
            className="w-32 h-32 object-cover rounded-full mr-6"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-white text-2xl font-semibold mb-4 text-center">Visión</h2>
            <p className="text-white text-center">
              Proporcionar productos farmacéuticos de calidad con un servicio excepcional, enfocado en el bienestar de
              nuestros clientes. Nuestra misión es facilitar el acceso a medicamentos y productos de salud a través de
              un trato personalizado y un servicio confiable, cubriendo las necesidades de nuestros usuarios tanto en
              nuestra farmacia física como en el entorno digital.
            </p>
          </div>
        </div>
      
        {/* Espaciado adicional después de Visión */}
        <div className="h-12"></div>
      </div>
    );
  };
  
  export default MissionVision;