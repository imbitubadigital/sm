'use server';

import { PaginationOrders, SearchPaginate } from "@/@types/order";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";



export async function getAllOrders({search, limit, page}: SearchPaginate) {

    const where: Prisma.order_surpresa_musicalWhereInput = {
        OR: [
            {
                id: Number(search),
            },
            {
                remoteJid:  {
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
        } as PaginationOrders


        return data


}