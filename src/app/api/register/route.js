import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, firebaseId } = await req.json();

        if (!email || !firebaseId) {
            return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({
            where: { firebaseId }
        });

        if (existingUser) {
            return Response.json({ error: "El usuario ya está registrado" }, { status: 400 });
        }

        // Crear usuario en la base de datos
        const newUser = await prisma.usuario.create({
            data: { email, firebaseId },
        });

        return Response.json(newUser, { status: 201 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
