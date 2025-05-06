import React, { useEffect, useState } from "react";

function Forum() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: '¿Cómo puedo pedir mis medicamentos a domicilio?',
      content: 'Me gustaría saber el proceso de compra y entrega...',
      answers: [
        'Puedes usar nuestro servicio de entrega exprés, solo llena tus datos y la dirección de envío.'
      ]
    },
    {
      id: 2,
      title: '¿Necesito receta para comprar ciertos medicamentos?',
      content: 'Tengo dudas sobre si algunos medicamentos requieren receta...',
      answers: []
    }
  ]);

  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionTitle || !newQuestionContent) return;

    const newQuestion = {
      id: Date.now(),
      title: newQuestionTitle,
      content: newQuestionContent,
      answers: []
    };

    setQuestions([...questions, newQuestion]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
  };

  return (
    <div className="flex flex-col w-full p-4 gap-6 bg-gray-100">
  {/* Layout principal con padding y espacio entre bloques */}

  <div className="container mx-auto text-center my-4 sm:my-6 px-4">
    {/* 🟢 Centrado general del encabezado + padding horizontal en mobile */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-4">
      Foro de Farmacias del Sol
    </h1>
    <p className="text-base sm:text-lg text-gray-700">
      ¡Comparte tus dudas y encuentra respuestas sobre nuestros productos y servicios!
    </p>
  </div>

  {/* FORMULARIO */}
  <form
    onSubmit={handleCreateQuestion}
    className="w-full max-w-2xl mx-auto flex flex-col gap-4 bg-white shadow-md rounded-lg p-4 sm:p-6 border-2 border-green-500 mb-8 px-4"
  >
    {/* 🟢 max-w-2xl centra y limita el ancho para buena lectura */}
    {/* 🟢 p-4 para móvil y sm:p-6 en pantallas medianas y grandes */}
    {/* 🟢 px-4 garantiza espacio lateral en mobile */}
    
    <input
      id="questionTitle"
      type="text"
      value={newQuestionTitle}
      onChange={(e) => setNewQuestionTitle(e.target.value)}
      placeholder="Título de la pregunta"
      required
      className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
    />
    <textarea
      id="questionContent"
      value={newQuestionContent}
      onChange={(e) => setNewQuestionContent(e.target.value)}
      placeholder="Describe tu consulta..."
      rows={3}
      required
      className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
    ></textarea>

    <button
      type="submit"
      className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 hover:scale-95 transition-all duration-300 shadow-md transform"
    >
      {/* 🟢 hover:scale-95 reduce suavemente el botón al hacer hover */}
      Publicar pregunta
    </button>
  </form>

  {/* TÍTULO DE SECCIÓN */}
  <div className="w-full max-w-2xl mx-auto text-center px-4">
    {/* 🟢 Añadimos px-4 para proteger los márgenes en pantallas chicas */}
    <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-2">
      ¡PREGUNTAS RECIENTES!
    </h2>
    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
  </div>

  {/* LISTA DE PREGUNTAS */}
  {questions.map((q) => (
    <div
      key={q.id}
      className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 border-2 border-green-500 px-4"
    >
      {/* 🟢 px-4 mejora el padding lateral en móviles */}
      <h3 className="text-base sm:text-lg font-bold text-black mb-2">{q.title}</h3>
      <p className="text-sm sm:text-base text-gray-700 mb-2">{q.content}</p>

      {q.answers && q.answers.length > 0 ? (
        <div className="mt-2">
          <strong className="text-green-700">Respuestas:</strong>
          <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
            {q.answers.map((ans, index) => (
              <li key={index}>{ans}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          Aún no hay respuestas. ¡Sé el primero en responder!
        </p>
      )}
    </div>
  ))}
</div>

  );
}

export default Forum;
