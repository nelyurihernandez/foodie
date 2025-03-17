import { PrismaClient } from "@prisma/client";

export const addReceta = async (nombre, descripcion, ingredientes, pasos, categoriaId, firebaseId,imagen) => {
    const prisma = new PrismaClient();
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { firebaseId },
        });

        if (!usuario) throw new Error("Usuario no encontrado");

        return await prisma.receta.create({
            data: {
                nombre,
                descripcion,
                ingredientes,
                pasos,
                categoriaId,
                usuarioId: usuario.id,
                imagen
            },
        });
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
};

export const createCategoria = async (nombre) => {
    const prisma = new PrismaClient();

    return await prisma.categoria.upsert({
        where: { nombre },
        update: {},
        create: { nombre },
    });
};

export const getRecetas = async () => {
    const prisma = new PrismaClient();
    try {
        const recetas = await prisma.receta.findMany({
            include: {
                categoria: true, // Incluye la información de la categoría
                usuario: true,   // Incluye la información del usuario
            },
        });
        return recetas;
    } catch (error) {
        throw new Error("Error al obtener recetas: " + error.message);
    } finally {
        await prisma.$disconnect();
    }
};