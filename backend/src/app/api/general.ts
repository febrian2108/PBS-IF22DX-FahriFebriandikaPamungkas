import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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