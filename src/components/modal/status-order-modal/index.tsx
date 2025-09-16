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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updateStatusOrders } from '@/server/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Cell } from '@tanstack/react-table'
import { LoaderCircleIcon } from 'lucide-react'

type StatusOrderModalProps = {
	isOpen: boolean
	onClose: () => void
	cell: OrderSm
	keyQuery: (string | number)[]
}

const FormSchema = z.object({
	type: z.enum(
		[
			'aguardando pagamento',
			'pagamento confirmado',
			'link gerado',
			'em produção',
			'produção entregue',
			'cancelado',
		],
		{
			required_error: 'Selecione uma das opções.',
		},
	),
})

export type StatusOrder = z.infer<typeof FormSchema>['type']

export function StatusOrderModal({
	isOpen,
	onClose,
	cell,
	keyQuery,
}: StatusOrderModalProps) {
	const orderId = cell.id
	const status = cell.status as StatusOrder

	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	const updateStatus = useMutation({
		mutationFn: updateStatusOrders,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: keyQuery })
			onClose()
		},
		onError: (error) => {
			console.error('Error updating status:', error)
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		updateStatus.mutate({ id: Number(orderId), status: data.type })
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[330px]">
				<DialogHeader>
					<DialogTitle>Atualizar status</DialogTitle>
					<DialogDescription>
						Selecione a opção que deseja alterar
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={status}
											className="flex flex-col space-y-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="aguardando pagamento" />
												</FormControl>
												<FormLabel className="font-normal">
													Aguardando pagamento
												</FormLabel>
											</FormItem>

											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="pagamento confirmado" />
												</FormControl>
												<FormLabel className="font-normal">
													Pagamento confirmado
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="link gerado" />
												</FormControl>
												<FormLabel className="font-normal">
													Link de pagamento gerado
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="em produção" />
												</FormControl>
												<FormLabel className="font-normal">
													Em produção
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="produção entregue" />
												</FormControl>
												<FormLabel className="font-normal">
													Produção entregue
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="cancelado" />
												</FormControl>
												<FormLabel className="font-normal">Cancelado</FormLabel>
											</FormItem>
										</RadioGroup>
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
