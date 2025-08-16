import { PrismaClient } from '@prisma/client'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: ['query', 'error', 'warn'],
	})
}

export const db = global.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = db

// Adicione um tratamento de erro básico
db.$connect()
	.then(() => {
		console.log('Successfully connected to database')
	})
	.catch((e) => {
		console.error('Failed to connect to database:', e)
	})
