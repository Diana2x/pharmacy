const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 shadow-md">
        <h2 className="text-center text-green-600 text-2xl font-bold mb-6">
          Crear una cuenta
        </h2>
        <form>
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

          <label
            htmlFor="confirm-password"
            className="block text-gray-700 mb-2"
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
          >
            Registrarse
          </button>
        </form>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-green-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};
export default Register;
