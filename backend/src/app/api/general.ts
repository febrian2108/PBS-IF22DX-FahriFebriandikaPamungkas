import { Prisma, PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { POST } from "./user/route";

export const prisma1 = new PrismaClient();

// fungsi untuk user tidak ditemukan
export const getResponseUserNotFound = NextResponse.json(
    {
        metaData: {
            error: true,
            message: process.env.USER_NOT_FOUND_MESSAGE,
            list: "Data User",
            status: 404,
        },
    },
    {
        status: 404,
    }
);

// fungsi untuk enkripsi password
export const hashPassword = (real_password: string) => {
    //enkripsi password
    const salt_password = genSaltSync(10);
    const result_password = hashSync(real_password, salt_password);

    return result_password;
};
