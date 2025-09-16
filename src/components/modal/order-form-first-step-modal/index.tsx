'use client'
import type { OrderSm } from '@/@types/order'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updateOrdersFirstStep, updateStatusOrders } from '@/server/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Cell } from '@tanstack/react-table'
import { LoaderCircleIcon } from 'lucide-react'

type StatusOrderModalProps = {
	isOpen: boolean
	onClose: () => void
	order: OrderSm
	keyQuery: (string | number)[]
}

const FormOrderFirstSchema = z.object({
	honoree_name: z
		.string({
			required_error: 'Informe o nome.',
		})
		.min(1, 'Informe o nome.'),
	honoree_age: z
		.string({
			required_error: 'Informe a idade.',
		})
		.min(1, {
			message: 'Informe a idade.',
		}),
	kinship: z
		.string({
			required_error: 'Informe o parentesco.',
		})
		.min(1, {
			message: 'Informe o parentesco.',
		}),
	music_style: z
		.string({
			required_error: 'Informe estilo da música.',
		})
		.min(1, {
			message: 'Informe estilo da música.',
		}),
	tribute_reason: z
		.string({
			required_error: 'Informe o motivo.',
		})
		.min(1, {
			message: 'Informe o motivo.',
		}),
	user: z
		.string({
			required_error: 'Informe o nome do titular.',
		})
		.min(1, {
			message: 'Informe o nome do titular.',
		}),
})

export type FormFirstStepOrder = z.infer<typeof FormOrderFirstSchema>

export function OrderFormFirstStepModal({
	isOpen,
	onClose,
	order,
	keyQuery,
}: StatusOrderModalProps) {
	const orderId = order.id

	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof FormOrderFirstSchema>>({
		resolver: zodResolver(FormOrderFirstSchema),
		mode: 'all',
		defaultValues: {
			honoree_name: order.honoree_name || '',
			honoree_age: order.honoree_age || '',
			kinship: order.kinship || '',
			music_style: order.music_style || '',
			tribute_reason: order.tribute_reason || '',
			user: order.user || '',
		},
	})

	const updateStatus = useMutation({
		mutationFn: updateOrdersFirstStep,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: keyQuery })
			onClose()
		},
		onError: (error) => {
			console.error('Error updating status:', error)
		},
	})

	async function onSubmit(data: z.infer<typeof FormOrderFirstSchema>) {
		updateStatus.mutate({ id: Number(orderId), data })
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[480px]">
				<DialogHeader>
					<DialogTitle>Atualizar</DialogTitle>
					<DialogDescription>
						Atualize os dados primários do pedido.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
						<FormField
							control={form.control}
							name="honoree_name"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Homenageado(a)</FormLabel>
									<FormControl>
										<Input
											id="honoree_name"
											placeholder="Nome do(a) homenageado(a)"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="honoree_age"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Idade</FormLabel>
									<FormControl>
										<Input
											id="honoree_age"
											placeholder="Idade do(a) homenageado(a)"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="kinship"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Parentesco</FormLabel>
									<FormControl>
										<Input
											id="kinship"
											placeholder="Informe o parentesco"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tribute_reason"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Motivo da homenagem</FormLabel>
									<FormControl>
										<Input
											id="tribute_reason"
											placeholder="Motivo da homenagem"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="music_style"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Estilo da música</FormLabel>
									<FormControl>
										<Input
											id="music_style"
											placeholder="Estilo da música"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="user"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Titular do pedido</FormLabel>
									<FormControl>
										<Input
											id="user"
											placeholder="Nome do titular"
											className="disabled:bg-gray-200 disabled:text-gray-6700"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="text-right">
							<Button type="submit" disabled={form.formState.isSubmitting}>
								Salvar
								{updateStatus.isPending && (
									<LoaderCircleIcon className="animate-spin" />
								)}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
