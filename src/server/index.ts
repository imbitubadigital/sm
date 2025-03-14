'use server';

import { db } from "@/lib/prisma";

export async function getAllOrders() {
    const orders = await db.order_surpresa_musical.findMany()
    console.log('aa',orders)
    return orders


}