'use server'

import type { PaginationOrders, SearchPaginate } from '@/@types/order'
import type { StatusOrder } from '@/components/modal/status-order-modal'
import { db } from '@/lib/prisma'

import type { Prisma } from '@prisma/client'

export async function getAllOrders({ search, limit, page }: SearchPaginate) {
	const where: Prisma.order_surpresa_musicalWhereInput = {
		OR: [
			{
				id: Number(search),
			},
			{
				remoteJid: {
					contains: search,
					mode: 'insensitive',
				},
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

type UpdateStatusOrderProps = {
	id: number
	status: StatusOrder
}

export async function updateStatusOrders({
	id,
	status,
}: UpdateStatusOrderProps) {
	const updateData: Prisma.order_surpresa_musicalUpdateInput = {
		status,
	}
	const order = await db.order_surpresa_musical.update({
		where: {
			id,
		},
		data: updateData,
	})

	return order
}
