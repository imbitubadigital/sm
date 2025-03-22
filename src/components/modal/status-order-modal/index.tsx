'use client'
import type { OrdersProps } from '@/@types/order'
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
	cell: Cell<OrdersProps, unknown> | null
	keyQuery: (string | number)[]
}

const FormSchema = z.object({
	type: z.enum(
		[
			'pedido incompleto',
			'aguardando pagamento',
			'pagamento confirmado',
			'em produção',
			'produção entregue',
		],
		{
			required_error: 'Selecione uma opção.',
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
	const orderId = cell?.row.original.id
	const status = cell?.row.original.status as StatusOrder

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
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		updateStatus.mutate({ id: Number(orderId), status: data.type })
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar status do pedido #{orderId}</DialogTitle>
					<DialogDescription>
						Selecione a opção que deseja alterar
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
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
													<RadioGroupItem value="pedido incompleto" />
												</FormControl>
												<FormLabel className="font-normal">
													Pedido Incompleto
												</FormLabel>
											</FormItem>
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
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={form.formState.isSubmitting}>
							Salvando
							{updateStatus.isPending && (
								<LoaderCircleIcon className="animate-spin" />
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
