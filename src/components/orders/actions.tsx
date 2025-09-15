import type { Row } from '@tanstack/react-table'
import { Eye, FolderInput } from 'lucide-react'

import type { OrderSm } from '@/@types/order'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const ActionControl = ({ row }: { row: Row<OrderSm> }) => {
	const router = useRouter()
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
			</div>
		</>
	)
}
