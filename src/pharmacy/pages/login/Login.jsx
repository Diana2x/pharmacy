const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 shadow-md">
        <h2 className="text-center text-green-600 text-2xl font-bold mb-6">
          Iniciar sesión
        </h2>
        <form>
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
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-[#80CC28] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-green-600 hover:underline">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
};

export default Login;
