"use client";
import { getCurrentUserEmail } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RecipeCard = ({ nombre, categoria, descripcion, imagen, id, reload, onEdit, pasos, ingredientes }) => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getCurrentUserEmail();
      setUserEmail(email);
    };

    fetchEmail();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/recetas?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Receta eliminada correctamente");
        reload();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error al eliminar la receta:", error);
      alert("Hubo un problema al eliminar la receta.");
    }
  };

  const handleEdit = () => {
    onEdit({ id, nombre, categoria, descripcion, imagen, pasos, ingredientes }); // Envía los datos al formulario
  };

  return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 border-2 border-[#dd8e80] 
                    transform transition-transform duration-300 hover:scale-105">
        <img src={imagen} alt={nombre} className="w-full h-32 object-cover rounded-lg" />
        <h3 className="text-[#745437] font-bold text-lg mt-2">{nombre}</h3>
        <p className="text-[#dd8e80] text-sm">{descripcion}</p>
        <span className="text-sm text-white bg-[#dd8e80] px-2 py-1 rounded-lg inline-block mt-2">
          {categoria}
        </span>
        {/* Mostrar botones solo si el usuario autenticado es "nelsonvozj@gmail.com" */}
        {userEmail === "nelyurihernandez5b@gmail.com" && (
          <div className="mt-2">
            <button
              onClick={handleEdit}
              className="mx-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-lg 
                      hover:bg-blue-600 transition duration-200"
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="mx-2 bg-red-500 text-white text-sm px-2 py-1 rounded-lg 
                      hover:bg-red-600 transition duration-200"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      );
};



      export default RecipeCard;
