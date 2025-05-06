import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../libs/firebase/config";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (currentUser && isOpen) {
      setDisplayName(currentUser.displayName || "");
      setMessage({ text: "", type: "" });
    }
  }, [currentUser, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      setMessage({ text: "El nombre no puede estar vacío", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Actualizar el perfil en Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      // Actualizar localStorage con el nuevo displayName
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      userData.displayName = displayName;
      localStorage.setItem("user", JSON.stringify(userData));

      setMessage({ text: "Perfil actualizado correctamente", type: "success" });

      // Cerrar el modal después de un breve retraso
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMessage({ text: "Error al actualizar el perfil", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="p-6 mx-4 w-full max-w-md bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-600">Editar Perfil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {currentUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="overflow-hidden w-20 h-20 rounded-full border-2 border-green-500">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Foto de perfil"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-gray-600 bg-gray-200">
                    {displayName ? (
                      <span className="text-2xl font-bold">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-2xl font-bold">U</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="displayName" className="block mb-1 text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="p-2 w-full bg-gray-100 rounded-md border border-gray-300 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">El email no se puede cambiar</p>
            </div>

            {message.text && (
              <div
                className={`p-2 rounded-md text-sm ${
                  message.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex pt-2 space-x-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-700">Debes iniciar sesión para editar tu perfil</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
