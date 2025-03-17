import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaWhatsapp } from "react-icons/fa"; // Importamos el ícono de WhatsApp

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ebdec2]">
      <Header />
      <main className="flex-grow flex items-center justify-center flex-col">
        <h2 className="text-4xl md:text-6xl font-bold text-[#725C3F] font-cursive animate-float">
          Descubre recetas con FoodieRecetas
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[#725C3F] italic font-cursive">
          ¡Descubre un mundo de sabores, regístrate ahora!
        </p>
        <p className="mt-4 text-lg md:text-xl text-[#725C3F] italic font-cursive">
          Encuentra recetas a tu medida, actualizadas por nuestro chef. ¡Contáctanos por WhatsApp para recetas personalizadas!
        </p>
      </main>
      <Footer />

      
      <div className="fixed bottom-6 right-6 flex flex-col items-center">
       
        <span className="text-2xl animate-bounce text-[#e28879]">⬇</span>

       
        <a
          href="https://wa.me/584247662700"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
    </div>
  );
}
