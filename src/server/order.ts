'use server'

import type { PaginationOrders, SearchPaginate } from '@/@types/order'
import type { FormFirstStepOrder } from '@/components/modal/order-form-first-step-modal'
import type { FormSecondStepOrder } from '@/components/modal/order-form-second-step-modal'
import type { StatusOrder } from '@/components/modal/status-order-modal'
import { db } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function getAllOrders({ search, limit, page }: SearchPaginate) {
	const where: Prisma.order_smWhereInput = {
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
	const count = await db.order_sm.count({ where })
	const content = await db.order_sm.findMany({
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
type UpdateOrderFirstStepProps = {
	id: number
	data: FormFirstStepOrder
}
type UpdateOrderSecondStepProps = {
	id: number
	data: FormSecondStepOrder
}

export async function updateStatusOrders({
	id,
	status,
}: UpdateStatusOrderProps) {
	const updateData: Prisma.order_surpresa_musicalUpdateInput = {
		status,
	}
	const order = await db.order_sm.update({
		where: {
			id,
		},
		data: updateData,
	})

	return order
}
export async function updateOrdersFirstStep({
	id,
	data,
}: UpdateOrderFirstStepProps) {
	const updateData: Prisma.order_surpresa_musicalUpdateInput = {
		...data,
	}
	const order = await db.order_sm.update({
		where: {
			id,
		},
		data: updateData,
	})

	return order
}
export async function updateOrdersSecondStep({
	id,
	data,
}: UpdateOrderSecondStepProps) {
	const updateData: Prisma.order_surpresa_musicalUpdateInput = {
		...data,
	}
	const order = await db.order_sm.update({
		where: {
			id,
		},
		data: updateData,
	})

	return order
}

export async function getOrder(id: number) {
	const order = await db.order_sm.findUnique({
		where: { id },
	})

	return order
}
export async function removeOrder(id: number) {
	await db.order_sm.delete({
		where: { id },
	})
}
