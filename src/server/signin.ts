'use server'
import type { SignInProps } from '@/@types/login'

import { TOKEN_KEY } from '@/middleware'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function singIn({ email, password }: SignInProps) {
	const cookiesData = await cookies()
	cookiesData.set(TOKEN_KEY, 'token')
	if (
		email === process.env.EMAIL_LOGIN &&
		password === process.env.PASS_LOGIN
	) {
		return true
	}
	return false
}

export async function logout() {
	const cookiesData = await cookies()
	cookiesData.delete(TOKEN_KEY)
	redirect('/')
}
