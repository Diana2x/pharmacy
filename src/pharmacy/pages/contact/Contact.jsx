import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Formulario enviado:", form);
      setMensajeExito("✅ ¡Gracias! Nos pondremos en contacto contigo pronto.");
      setForm({ nombre: "", correo: "", mensaje: "" });
      setIsSubmitting(false);

      setTimeout(() => setMensajeExito(""), 6000); // Oculta el mensaje después de 4s
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full p-4 gap-6 bg-gray-100">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col lg:flex-row container mx-auto p-4 md:p-8 gap-8">
        {/* INFO DE CONTACTO */}
        <div className="flex flex-col w-full gap-6 border-2 rounded-lg border-green-500 p-4 sm:p-6 bg-white shadow-md">
          {/* CORPORATIVO */}
          <div className="info-box flex flex-col sm:flex-row items-start gap-4 bg-green-50 p-4 rounded-md shadow w-full">
            <div className="text-green-600 text-3xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black-800">CORPORATIVO</h3>
              <p className="text-base text-green-700">
                Avenida Moctezuma #456, Colonia Cd del Sol, Zapopan, Jalisco, C.P. 45050
              </p>
            </div>
          </div>

          {/* TELÉFONOS */}
          <div className="info-box flex flex-col sm:flex-row items-start gap-4 bg-yellow-50 p-4 rounded-md shadow w-full">
            <div className="text-yellow-600 text-3xl">
              <FaPhoneAlt />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black-800">TELÉFONOS</h3>
              <p className="text-base text-green-700">
                (33) 3818 1818<br />
                (83) FARMACIA (32762242)
              </p>
            </div>
          </div>

          {/* REDES SOCIALES */}
          <div className="info-box flex flex-col gap-4 bg-green-50 p-4 rounded-md shadow w-full">
            <h3 className="text-lg font-semibold text-black-800">REDES SOCIALES</h3>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                <FaFacebook size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black-400 hover:text-blue-500">
                <FaXTwitter size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>

          {/* CORREO ELECTRÓNICO */}
          <div className="info-box flex flex-col sm:flex-row items-start gap-4 bg-yellow-50 p-4 rounded-md shadow w-full">
            <div className="text-yellow-600 text-3xl">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black-800">CORREO ELECTRÓNICO</h3>
              <p className="text-base text-gray-700">
                <a href="mailto:farmaciadelsol@gmail.com" className="text-green-600 hover:underline">
                  farmaciadelsol@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="flex items-center justify-center w-full border-2 rounded-lg border-green-500 p-4 sm:p-6 bg-white shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 text-center">Contáctenos</h2>

            {/* MENSAJE DE ÉXITO */}
            {mensajeExito && (
              <div className="bg-green-100 text-green-800 border border-green-300 p-4 rounded-md text-center text-sm">
                {mensajeExito}
              </div>
            )}

            <input
              type="text"
              name="nombre"
              placeholder="Nombre Completo"
              required
              value={form.nombre}
              onChange={handleChange}
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              required
              value={form.correo}
              onChange={handleChange}
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <textarea
              name="mensaje"
              placeholder="Escriba su mensaje"
              required
              value={form.mensaje}
              onChange={handleChange}
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className={`w-full text-white font-semibold py-2 px-4 rounded-md transition ${
                isSubmitting
                  ? "bg-green-400 animate-pulse cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "ENVIAR"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;