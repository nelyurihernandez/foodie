"use client";
import { getCurrentUserEmail } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

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
    onEdit({ id, nombre, categoria, descripcion, imagen, pasos, ingredientes });
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
  
    // Colores de tu app
    const rosa = "#dd8e80";
    const marron = "#745437";
  
    // Encabezado decorativo
    doc.setFillColor(rosa);
    doc.rect(0, 0, 210, 20, "F"); // Ancho total A4
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // Blanco
    doc.text(`Receta: ${nombre}`, 10, 13);
  
    // Sección Categoría
    doc.setFontSize(12);
    doc.setTextColor(marron);
    doc.text(`Categoría: ${categoria}`, 10, 30);
  
    // Sección Descripción
    doc.setTextColor(0, 0, 0);
    doc.text("Descripción:", 10, 40);
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(descripcion, 180), 10, 46);
  
    // Sección Ingredientes
    let y = 60;
    doc.setFontSize(12);
    doc.setTextColor(rosa);
    doc.text("Ingredientes:", 10, y);
    y += 6;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(ingredientes, 180), 10, y);
  
    y += doc.getTextDimensions(doc.splitTextToSize(ingredientes, 180)).h + 4;
  
    // Sección Pasos
    doc.setFontSize(12);
    doc.setTextColor(rosa);
    doc.text("Pasos:", 10, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(doc.splitTextToSize(pasos, 180), 10, y);
  
    y += doc.getTextDimensions(doc.splitTextToSize(pasos, 180)).h + 6;
  
    // Imagen si es base64
    if (imagen?.startsWith("data:image")) {
      doc.setTextColor(marron);
      doc.setFontSize(12);
      doc.text("Imagen de la receta:", 10, y);
      y += 4;
      doc.addImage(imagen, "JPEG", 10, y, 100, 60); // ajusta tamaño si necesitas
    }
  
    doc.save(`${nombre}.pdf`);
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 border-2 border-[#dd8e80] 
                  transform transition-transform duration-300 hover:scale-105">
      <img src={imagen} alt={nombre} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="text-[#745437] font-bold text-lg mt-2">{nombre}</h3>
      <p className="text-[#dd8e80] text-sm">{descripcion}</p>
      <p className="text-[#dd8e80] text-sm">{pasos}</p>
      <p className="text-[#dd8e80] text-sm">{ingredientes}</p>
      <span className="text-sm text-white bg-[#dd8e80] px-2 py-1 rounded-lg inline-block mt-2">
        {categoria}
      </span>
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

          <button
            onClick={handleGeneratePDF}
            className="mx-2 bg-green-500 text-white text-sm px-2 py-1 rounded-lg 
                    hover:bg-green-600 transition duration-200"
          >
            Descargar PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
