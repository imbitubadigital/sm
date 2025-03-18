'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { singIn } from '@/server'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function FormLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function handleLogin() {
		if (email && password) {
			const response = await singIn({ email, password })
			if (response) {
				toast.success('Logado com sucesso!')
				redirect('/dashboard')
			} else {
				toast.error('Credenciais inválidas!')
			}
		}
	}
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Insira suas credenciais</CardDescription>
			</CardHeader>
			<div>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Email</Label>
							<Input
								id="name"
								placeholder="Digite seu email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								type="password"
								placeholder="Digite sua senha"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-end mt-6">
					<Button type="button" onClick={handleLogin}>
						Entrar
					</Button>
				</CardFooter>
			</div>
		</Card>
	)
}
