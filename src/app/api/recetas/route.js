import { addReceta, createCategoria, getRecetas } from "@/lib/querys-db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const recetas = await getRecetas();
        return Response.json(recetas, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { nombre, descripcion, ingredientes, pasos, categoriaId, firebaseId, image } = await req.json();
        // console.log(nombre)
        // console.log(descripcion)
        // console.log(ingredientes)
        // console.log(pasos)
        // console.log(categoriaId)
        // console.log(firebaseId)
        // console.log(image)

        if (!nombre || !descripcion || !ingredientes || !pasos || !categoriaId || !firebaseId || !image) {
            return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        console.log("📩 Datos recibidos:", { nombre, descripcion, ingredientes, pasos, categoriaId, firebaseId, image });

        // Obtener o crear la categoría
        const categoriaObj = await createCategoria(categoriaId);
        const categoriaIdReal = categoriaObj.id; // Usamos el ID de la categoría creada o existente

        console.log("✅ Categoría obtenida o creada con ID:", categoriaIdReal);

        // Crear la receta
        const receta = await addReceta(nombre, descripcion, ingredientes, pasos, categoriaIdReal, firebaseId, image);

        return Response.json(receta, { status: 201 });
    } catch (error) {
        console.error("❌ Error al crear receta:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}



export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log(typeof id+"id")
        if (!id) {
            return Response.json({ error: "Se requiere un ID de receta" }, { status: 400 });
        }

        await prisma.receta.delete({
            where: { id: id },
        });

        return Response.json({ message: "Receta eliminada correctamente" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Error al eliminar la receta: " + error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id"); // Obtiene el ID desde la URL
        console.log(id,"popo")
        if (!id) {
            return Response.json({ error: "Se requiere un ID de receta" }, { status: 400 });
        }

        const { nombre, descripcion, ingredientes, pasos, categoriaId, image } = await req.json();
        console.log(nombre,"holi")
        console.log(descripcion,"holas")
        console.log(ingredientes,"holu")
        console.log(pasos,"oli")
        console.log(categoriaId,"holoo")
        console.log(image,"imageeee")

        const recetaExistente = await prisma.receta.findUnique({
            where: { id: id },
        });
 
        if (!recetaExistente) {
            return Response.json({ error: "La receta no existe" }, { status: 404 });
        }

        // Buscar la categoría por su nombre
        let categoria = await prisma.categoria.findUnique({
            where: { nombre: categoriaId },
            select: { id: true }
        });
        
        // Si la categoría no existe, crearla
        if (!categoria) {
            categoria = await prisma.categoria.create({
            data: { nombre: categoriaId },
            select: { id: true }
            });
        }
        
        // Actualizar la receta con la categoría encontrada o creada
        const recetaActualizada = await prisma.receta.update({
            where: { id: id },
            data: {
            nombre,
            descripcion,
            ingredientes,
            pasos,
            categoria: {
                connect: { id: categoria.id }
            },
            imagen:image
            }
        });
          

        return Response.json({ message: "Receta actualizada correctamente", receta: recetaActualizada }, { status: 200 });
    } catch (error) {
        console.error("❌ Error al actualizar receta:", error);
        return Response.json({ error: "Error al actualizar la receta: " + error.message }, { status: 500 });
    }
}
