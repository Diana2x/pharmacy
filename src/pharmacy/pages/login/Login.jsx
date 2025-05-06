import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, FirebaseDB } from "../../../libs/firebase/config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, getDoc } from "firebase/firestore/lite";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      // Obtener datos del usuario desde Firestore para verificar si es administrador
      const userDocRef = doc(FirebaseDB, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado en la base de datos");
      }
      
      const userData = userDoc.data();
      const isAdmin = userData.isAdmin === true;
      
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        isAdmin: isAdmin
      }));
      
      // Redirect based on user role
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Intenta más tarde.");
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 shadow-md">
        <h2 className="text-center text-green-600 text-2xl font-bold mb-6">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-[#80CC28] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Procesando..." : "Ingresar"}
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
