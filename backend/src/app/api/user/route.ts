import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

// buat variabel prisma
const prisma = new PrismaClient();

// buat fungsi service "Get" (tb_user)
export const GET = async () => {
    // menampilkan data dari user
    const view = await prisma.user.findMany({});
    // jika data user tidak ditemukan
    if (view.length == 0) {
        return NextResponse.json(
            {
                metaData: {
                    error: true,
                    message: process.env.USER_NOT_FOUND_MESSAGE,
                    list: "Data User",
                    status: 404,
                },
                data_user: view,
            },
            {
                status: 404,
            }
        );
    }
    // proses atau respon api
    return NextResponse.json({
            metaData: {
                error: false,
                message: "Data user berhasil ditampilkan",
                list: "Data User",
            },
            data_user: view,
        },
        {
            status: 200,
        }
    );
};

//buat fungsi service "Post" (tb_user)
export const POST = async (request: NextRequest) => {
    //buat object untuk data isian
    const { nama_value, username_value, password_value } = await request.json();

    //cek apakah ada userame yang sama di database
    const cek = await prisma.user.findMany({
        where: {
            username: username_value,
        },
    });

    // jika data username di temukan
    if (cek.length >= 1) {
        return NextResponse.json(
            {
                metaData: {
                    error: true,
                    message: "Data User Gagal disimpan! Username sudah digunakan",
                    status: 409,
                },
                data_user: cek,
            },
            {
                status: 409,
            }
        );
    }

    //enkripsi password
    const salt = genSaltSync(10);
    const encrypt = hashSync(password_value, salt);

    //simpan data ke database
    const save = await prisma.user.create({
        data: {
            nama: nama_value,
            username: username_value,
            password: encrypt,
        },
    });

    //proses atau respon api
    return NextResponse.json(
        {
            metaData: {
                error: false,
                message: "Data user berhasil Disimpan",
                status: 201,
            },
        },{
            status: 201,
        }
    );
};