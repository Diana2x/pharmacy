const Faq = () => {
  return (
    <div className="flex flex-col w-full p-4 gap-6 bg-gray-100">
      <div className="container mx-auto text-center my-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-gray-700">
          Encuentra las respuestas a las preguntas más comunes sobre nuestros
          servicios.
        </p>
      </div>

      {/* Contenido principal el gap me ayuda a separar las cajas de las preguntas y el formulario */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* preguntas */}
        <div className="flex flex-col w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6 border-2 border-green-500">
          {/* Bloque para pregunta #1 */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">
              ¿Cómo puedo comprar medicamentos que requieren receta?
            </h3>
            <p className="text-base text-gray-700">
              Si tu pedido es Envío a Domicilio el repartidor solicitará la
              receta médica antes de recolectar tu pedido y una vez entregado el
              medicamento se regresará la receta.
              <br />
              Si tu pedido es Recoger en Farmacia mediante Collect & Smart,
              deberás presentar tu receta médica al momento de ir por tu compra.
            </p>
          </div>

          {/* Bloque para pregunta #2 */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">
              ¿Cómo puedo realizar un pedido?
            </h3>
            <p className="text-base text-gray-700">
              Puedes realizar un pedido a través de nuestra página web,
              seleccionando los productos que deseas y completando la
              información de pago.
            </p>
          </div>

          {/* Bloque para pregunta #3 */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">
              ¿Ofrecen entregas a domicilio?
            </h3>
            <p className="text-base text-gray-700">
              Sí, contamos con servicio a domicilio en toda el área
              metropolitana de Guadalajara. Aplica un costo adicional según la
              zona.
            </p>
          </div>

          {/* Bloque para pregunta #4*/}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">
              ¿Cuáles son las formas de pago aceptadas?
            </h3>
            <p className="text-base text-gray-700">
              Aceptamos pagos con tarjetas de crédito, débito y transferencias
              bancarias. También puedes pagar en efectivo al recoger en
              farmacia.
            </p>
          </div>
        </div>

        {/* Esta parte es la caja de contacto */}
        <div className="flex flex-col w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 border-2 border-green-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            ¿Tienes otra pregunta?
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Si no encontraste la respuesta que buscabas, no dudes en
            contactarnos. Estamos aquí para ayudarte.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tu nombre"
              required
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <textarea
              placeholder="Escribe tu pregunta aquí..."
              required
              className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Faq;
