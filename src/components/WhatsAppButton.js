"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappNumber = "584247662700";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const [showArrows, setShowArrows] = useState(true);

  // Oculta las flechas después de 3 segundos y vuelve a mostrarlas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setShowArrows(true);
      setTimeout(() => setShowArrows(false), 3000); // Las flechas aparecen por 3 segundos
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center space-y-2">
      {/* Flechas animadas */}
      {showArrows && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#25D366] text-2xl"
        >
          ⬆️
        </motion.div>
      )}

      {/* Botón de WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform duration-200"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}
