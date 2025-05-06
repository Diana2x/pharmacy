import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { auth, FirebaseDB } from "../../../libs/firebase/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      if (data.password !== data["confirm-password"]) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(userCredential.user, {
        displayName: `${data.nombre} ${data.apellido}`,
      });

      await setDoc(doc(FirebaseDB, "users", userCredential.user.uid), {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        isAdmin: false, // Por defecto, los usuarios no son administradores
        createdAt: new Date().toISOString(),
      });

      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("El correo electrónico ya está en uso");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil");
      } else {
        setError("Error al registrar el usuario. Intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4">
      <div className="p-6 w-full max-w-md bg-white rounded-md border border-gray-200 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Crear una cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nombre" className="block mb-2 text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          <label htmlFor="apellido" className="block mb-2 text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            {...register("apellido")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          <label htmlFor="password" className="block mb-2 text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          <label htmlFor="confirm-password" className="block mb-2 text-gray-700">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            {...register("confirm-password")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#248BBF]"
          />

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 w-full text-white bg-green-600 rounded-md hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Procesando..." : "Registrarse"}
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-green-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};
export default Register;
