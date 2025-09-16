import type { Row } from '@tanstack/react-table'
import { FolderInput, Trash2 } from 'lucide-react'

import type { OrderSm } from '@/@types/order'
import { Button } from '@/components/ui/button'
import { removeOrder } from '@/server/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmModal } from '../modal/confirm-modal'

export const ActionControl = ({ row }: { row: Row<OrderSm> }) => {
	const router = useRouter()

	const [page] = useQueryState('page', parseAsInteger)
	const [limit] = useQueryState('limit', parseAsInteger)
	const [q] = useQueryState('q', { defaultValue: '' })

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const queryClient = useQueryClient()
	const id = row?.original?.id
	const KEY_QUERY = ['paginate-order', page, limit, q]
	const removeOrderMutate = useMutation({
		mutationFn: removeOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEY_QUERY })
			toast.success('Pedido deletado com sucesso!')
			setShowConfirmDelete(false)
		},
		onError: (error) => {
			console.error('Error updating status:', error)
		},
	})

	async function onSubmit(id: number) {
		removeOrderMutate.mutate(id)
	}

	return (
		<>
			<div className="flex gap-2">
				<Button
					type="button"
					title="Gerenciar o pedido"
					variant="ghost"
					className="h-8 w-8 p-0 group"
					onClick={() => router.push(`/dashboard/pedido/${row.original.id}`)}
				>
					<FolderInput size={80} />
				</Button>
				<Button
					type="button"
					title="Deletar o pedido"
					variant="ghost"
					className="h-8 w-8 p-0 group"
					onClick={() => setShowConfirmDelete(true)}
				>
					<Trash2 size={80} />
				</Button>
			</div>

			<ConfirmModal
				open={showConfirmDelete}
				onCloseModal={() => setShowConfirmDelete(false)}
				title="Atenção"
				description={`Tem certeza que deseja deletar o pedido ${row.original.id}? Esta ação não poderá ser desfeita.`}
				onConfirm={() => onSubmit(Number(row?.original?.id))}
				textConfirm="Confirmar"
				textCancel="Cancelar"
				load={removeOrderMutate.isPending}
			/>
		</>
	)
}
