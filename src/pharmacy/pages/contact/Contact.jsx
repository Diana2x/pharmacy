import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setIsSubmitting(true);
  
    // Simula un delay de envío (como si fuera a una API)
    setTimeout(() => {
      console.log("Formulario enviado:", form);
      alert("Gracias por contactarnos Nos pondremos en contacto contigo pronto.");
      setForm({ nombre: "", correo: "", mensaje: "" });
      setIsSubmitting(false);
    }, 1000);
  };
  

  return (
    <div className="flex flex-col w-full p-4 gap-6 bg-gray-100">
      {/* CONTENEDOR PRINCIPAL DE CONTACTO */}
      <div className="flex flex-col items-center justify-center mx-auto sm:flex-col lg:flex-row md:flex-col container m-10 max-h-[600px] gap-8">
        <div className="flex flex-col items-start justify-center w-full h-full border-2 rounded-lg border-green-500 p-6 gap-6 bg-white shadow-md">
          {/* CORPORATIVO */}
          <div className="info-box flex items-center gap-4 bg-green-50 p-4 rounded-md shadow w-full">
            <div className="iconos text-green-600 text-3xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black-800">CORPORATIVO</h3>
              <p className="text-base text-green-700">
                Avenida Moctezuma #456, Colonia Cd del Sol, Zapopan, Jalisco, C.P. 45050
              </p>
            </div>
          </div>

          {/* TELÉFONO */}
          <div className="info-box flex items-center gap-4 bg-yellow-50 p-4 rounded-md shadow w-full">
            <div className="iconos text-yellow-600 text-3xl">
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
          <div className="info-box flex flex-col gap-2 bg-green-50 p-4 rounded-md shadow w-full">
            <h3 className="text-lg font-semibold text-black-800">REDES SOCIALES</h3>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                <FaFacebook size={35} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black-400 hover:text-blue-500">
                <FaXTwitter size={35} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                <FaInstagram size={35} />
              </a>
            </div>
          </div>

          {/* CORREO */}
          <div className="info-box flex items-center gap-4 bg-yellow-50 p-4 rounded-md shadow w-full">
            <div className="iconos text-yellow-600 text-3xl">
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
        <div className="flex items-center justify-center w-full h-full border-2 rounded-lg border-green-500 p-6 bg-white shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
            <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Contáctenos</h2>
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