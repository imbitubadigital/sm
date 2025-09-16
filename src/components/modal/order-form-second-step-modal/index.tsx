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
import { Textarea } from '@/components/ui/textarea'
import {
	updateOrdersFirstStep,
	updateOrdersSecondStep,
	updateStatusOrders,
} from '@/server/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Cell } from '@tanstack/react-table'
import { LoaderCircleIcon } from 'lucide-react'

type FormSecondStepModalProps = {
	isOpen: boolean
	onClose: () => void
	order: OrderSm
	keyQuery: (string | number)[]
}

const FormOrderSecondSchema = z.object({
	additional_information: z.string().optional(),
	declaration: z
		.string({
			required_error: 'Informe a declaração.',
		})
		.min(1, {
			message: 'Informe a declaração.',
		}),
	honored_feature: z
		.string({
			required_error: 'Informe o que a pessoa representa.',
		})
		.min(1, {
			message: 'Informe o que a pessoa representa.',
		}),
	other_declaration: z.string().optional(),
})

export type FormSecondStepOrder = z.infer<typeof FormOrderSecondSchema>

export function OrderFormSecondStepModal({
	isOpen,
	onClose,
	order,
	keyQuery,
}: FormSecondStepModalProps) {
	const orderId = order.id

	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof FormOrderSecondSchema>>({
		resolver: zodResolver(FormOrderSecondSchema),
		mode: 'all',
		defaultValues: {
			declaration: order.declaration || '',
			honored_feature: order.honored_feature || '',
			other_declaration: order.other_declaration || '',
			additional_information: order.additional_information || '',
		},
	})

	const updateStatus = useMutation({
		mutationFn: updateOrdersSecondStep,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: keyQuery })
			onClose()
		},
		onError: (error) => {
			console.error('Error updating status:', error)
		},
	})

	async function onSubmit(data: z.infer<typeof FormOrderSecondSchema>) {
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
							name="declaration"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Declaração</FormLabel>
									<FormControl>
										<Textarea
											id="declaration"
											placeholder="Declaração"
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
							name="honored_feature"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>O que representa</FormLabel>
									<FormControl>
										<Textarea
											id="honored_feature"
											placeholder=">O que representa"
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
							name="other_declaration"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Outras declarações</FormLabel>
									<FormControl>
										<Textarea
											id="kinship"
											placeholder="Informe outras declarações"
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
							name="additional_information"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col gap-1">
									<FormLabel>Nova informações ou alterações</FormLabel>
									<FormControl>
										<Textarea
											id="additional_information"
											placeholder="Nova informações ou alterações"
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
