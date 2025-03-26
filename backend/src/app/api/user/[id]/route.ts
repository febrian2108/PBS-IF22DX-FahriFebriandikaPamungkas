import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {hashPassword, prisma1} from "../../general";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Fungsi DELETE untuk menghapus user berdasarkan ID
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    // Cek apakah user dengan ID tersebut ada
    const cek = await prisma.user.findUnique({
        where: { id: Number(params.id) },
    });

    // Jika user tidak ditemukan, kirim respons 404
    if (!cek) {
        return NextResponse.json(
            {
                metaData: {
                    error: true,
                    message: "Data User Gagal dihapus! ID tidak ditemukan",
                    status: 404,
                },
            },
            { status: 404 }
        );
    }

    // Hapus user dari database
    await prisma.user.delete({
        where: { id: Number(params.id) },
    });

    // Kirim respons sukses
    return NextResponse.json(
        {
            metaData: {
                error: false,
                message: "Data User berhasil dihapus",
                status: 200,
            },
        },
        { status: 200 }
    );
};


export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    // Ambil data dari request body
    const { nama_value, username_value, password_value } = await request.json();

    // Cek apakah user dengan ID tersebut ada
    const cek = await prisma.user.findUnique({
        where: { id: Number(params.id) },
    });

    // Jika user tidak ditemukan, kirim respons 404
    if (!cek) {
        return NextResponse.json(
            {
                metaData: {
                    error: true,
                    message: "Data User Gagal diperbarui! ID tidak ditemukan",
                    status: 404,
                },
            },
            { status: 404 }
        );
    }

    // Update data user
    const update = await prisma.user.update({
        where: { id: Number(params.id) },
        data: {
            nama: nama_value,
            username: username_value,
            password: hashPassword(password_value),
        },
    });

    // Kirim respons sukses
    return NextResponse.json(
        {
            metaData: {
                error: false,
                message: "Data User berhasil diperbarui",
                status: 200,
            },
            data_user: update,
        },
        { status: 200 }
    );
};