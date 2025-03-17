'use server';

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getAllOrders() {
    const search = ''
    const limit = 1
    const page = 2

    const where: Prisma.order_surpresa_musicalWhereInput = {
        OR: [
            {
                id: Number(search),
            },
            {
                whatsapp:  {
                    contains: search,
                    mode: 'insensitive'
                }
            },
        ],
    }
        const count = await db.order_surpresa_musical.count({ where })
        const content = await db.order_surpresa_musical.findMany({
            where,
            orderBy: {
                updated_at: 'desc',
            },
            take: limit,
            skip: (page - 1) * limit,
        })
        const data = {
            content,
            page,
            limit,
            totalElements: count,
            totalPages: Math.ceil(count / limit),
        }


        return data


}