"use client";
const CardRecipeDb = ({ nombre, categoria, descripcion, imagen, ingredientes, pasos }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-full" src={imagen} alt={nombre} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{nombre}</div>
          <p className="text-gray-700 text-base">{categoria}</p>
          <p className="text-gray-700 text-base">{descripcion}</p>
          <div className="mt-4">
            <h3 className="font-bold text-lg">Ingredientes:</h3>
            <p className="text-gray-700 text-base">{ingredientes}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-lg">Pasos:</h3>
            <p className="text-gray-700 text-base">{pasos}</p>
          </div>
        </div>
      </div>
    );
  };

  export default CardRecipeDb;
