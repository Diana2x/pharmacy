const Address = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[450px]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/foto-gratis/vista-cerca-mano-farmaceutico-tomando-caja-medicina-estante-farmacia_342744-320.jpg?t=st=1732913940~exp=1732917540~hmac=2ba150849ebb3a79238d02d3baa01e36f5b1464d8faed7ec6556650605fd4f4f&w=1380')",
        }}
      ></section>

      {/* Location Section */}
      <section className="container mx-auto py-12 px-6">
        <h3 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
          Nuestra Ubicación
        </h3>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-green-500 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="col-span-2 flex items-center justify-center">
            <iframe
              className="w-full h-[450px] rounded-lg shadow-md border border-green-300"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.0485909094354!2d-103.396246725185!3d20.64285460261609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af03041d7cd7%3A0x5dc4c2e229658d4f!2sAv.%20Xochitl%20311%2C%20Prados%20Tepeyac%2C%2045050%20Zapopan%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2sus!4v1732920211633!5m2!1ses-419!2sus"
              allowFullScreen=""
              loading="lazy"
              title="Farmacia del sol Ubicación"
            ></iframe>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4 bg-green-50 p-4 rounded-lg shadow-md border border-green-300">
            <div>
              <h4 className="text-lg font-semibold text-black-700 mb-2">Dirección:</h4>
              <p className="text-black-600">
                Av Xochitl 311, Prados Tepeyac, 45050 Zapopan, Jal., México
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-black-700 mb-2">Horario:</h4>
              <p className="text-black-600">Lunes a Viernes: 9:00 AM - 8:00 PM</p>
              <p className="text-black-600">Sábados: 10:00 AM - 6:00 PM</p>
              <p className="text-black-600">Domingos: Cerrado</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-Black-700 mb-2">Contacto:</h4>
              <p className="text-black-600">Teléfono: (33) 3818 1818</p>
              <p className="text-black-600">
                Email:{" "}
                <a
                  className="text-blue-500 hover:underline"
                >
                  farmaciasdelsol@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Address;
