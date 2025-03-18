'use server'
import type { SignInProps } from '@/@types/login'
import type { PaginationOrders, SearchPaginate } from '@/@types/order'
import { db } from '@/lib/prisma'
import { TOKEN_KEY } from '@/middleware'
import type { Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

export async function singIn({ email, password }: SignInProps) {
	const cookiesData = await cookies()
	console.log('email', email)
	console.log('pass', process.env.PASS_LOGIN)
	if (
		email === process.env.EMAIL_LOGIN &&
		password === process.env.PASS_LOGIN
	) {
		cookiesData.set(TOKEN_KEY, 'token')

		return true
	}
	return false
}

export async function logout() {
	const cookiesData = await cookies()
	cookiesData.delete(TOKEN_KEY)
	redirect('/')
}
