import { metadata } from "@/app/layout";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

// buat variabel prisma
const prisma = new PrismaClient();

// buat fungsi service "Get" (tb_user)
export const GET = async () => {
    // menampilkan data dari user
    const view = await prisma.user.findMany({});
    // jika data user tidak ditemukan
    if (view.length === 0) {
        return NextResponse.json({
            metaData: {
                error: true,
                message: "Data user tidak ditemukan",
                list: "Data User",
                status: 404,
            },
            data_user: view,
        }, {
            status: 404
        });
        }
    // proses atau respon api
    return NextResponse.json({
        metaData: {
            error: false,
            message: "Data user berhasil ditampilkan",
            list: "Data User",
        },
        data_user: view,
    },{
        status: 200
    });
};
