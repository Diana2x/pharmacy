const Login = () => {
  return (
    <div className="flex justify-between items-start min-h-screen p-4">
    {/* Formulario - Iniciar sesión */}
    <div className="w-1/2 p-6">
      <h2 className="text-center text-[#248BBF] text-2xl font-bold mb-4">
        Iniciar sesión
      </h2>
      <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <a
          href="#"
          className="block text-right text-[#80CC28] text-sm mb-4 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </a>
        <button className="bg-[#248BBF] text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
          Ingresar
        </button>
      </div>
    </div>
  
    {/* Formulario - Crear una cuenta */}
    <div className="w-1/2 p-6">
      <h2 className="text-center text-[#248BBF] text-2xl font-bold mb-4">
        Crear una cuenta
      </h2>
      <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <label htmlFor="nombre" className="block text-gray-700 mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <label htmlFor="apellido" className="block text-gray-700 mb-2">
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirm-password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
        />
        <button className="bg-[#248BBF] text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
          Crear cuenta
        </button>
      </div>
    </div>
   <div className="h-12"></div>
  </div>
  );
};

export default Login;
