import ImageGalleryComponent from "../../components/ImageGalleryComponent";

const HomePage = () => {
  return (
    <div className="p-4">
      {" "}
      {/* Changed m-4 to p-4 for padding */}
      {/* Image Gallery */}
      <ImageGalleryComponent />
      {/* Quality Medications Section */}
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
        {" "}
        {/* Centering the content */}
        <section className="my-8 text-center">
          <h2 className="text-2xl font-semibold">Medicamentos de Calidad</h2>
          <p className="mt-2">
            En Farmacias Ciudad del Sol, nos comprometemos a ofrecerte los
            mejores medicamentos, tanto originales como genéricos. Todos
            nuestros productos cumplen con los más altos estándares de calidad y
            son seleccionados cuidadosamente para tu bienestar.
          </p>
        </section>
        {/* Health Products Section */}
        <section className="my-8 text-center">
          <h2 className="text-2xl font-semibold">
            Productos de Salud y Bienestar
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>Suplementos vitamínicos y minerales</li>
            <li>Productos para el cuidado de la piel</li>
            <li>Medicamentos para el control de enfermedades crónicas</li>
            <li>Equipo médico y de diagnóstico</li>
            <li>Productos para el cuidado de la salud femenina y masculina</li>
          </ul>
        </section>
        {/* Special Offers Section */}
        <section className="my-8 text-center">
          <h2 className="text-2xl font-semibold">Ofertas Especiales</h2>
          <p className="mt-2">
            Aprovecha nuestras ofertas en medicamentos y productos de salud.
            Cada semana, tenemos descuentos especiales que te ayudarán a cuidar
            de tu salud sin afectar tu bolsillo.
          </p>
        </section>
        {/* Educational Resources Section */}
        <section className="my-8 text-center">
          <h2 className="text-2xl font-semibold">Recursos Educativos</h2>
          <p className="mt-2">
            Visita nuestra sección de recursos educativos para aprender más
            sobre el uso adecuado de medicamentos, consejos de salud y
            bienestar, y más. Nuestro objetivo es empoderarte con información
            valiosa para que tomes decisiones informadas sobre tu salud.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
