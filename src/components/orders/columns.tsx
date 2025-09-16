import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

import type { OrderSm } from '@/@types/order'
import { Badge } from '../ui/badge'
import { ActionControl } from './actions'
import { BADGE, STATUS } from './data-type'

export const columns: ColumnDef<OrderSm>[] = [
	{
		accessorKey: 'id',
		header: 'Código',
		cell: ({ row }) => {
			const client = row.original.user
			return <div className="flex flex-col">{row.original.id}</div>
		},
	},
	{
		accessorKey: 'user',
		header: 'Cliente',
		cell: ({ row }) => {
			return <div className="flex flex-col">{row.original.user}</div>
		},
	},
	{
		accessorKey: 'whatsapp',
		header: 'Telefone',
		cell: ({ row }) => {
			return <div className="flex flex-col">{row.original.whatsapp}</div>
		},
	},
	{
		accessorKey: 'honoree_name',
		header: 'Homenageado(a)',
		cell: ({ row }) => {
			return (
				<div className="flex flex-col">
					<span>{row.original.honoree_name}</span>
					<span>Idade: {row.original.honoree_age}</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'billing_type',
		header: 'Tipo pagamento',
		cell: ({ row }) => {
			return (
				<div className="flex flex-col">
					<span>{row.original.billing_type || '-'}</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Solicitado em',
		cell: ({ row }) => {
			const createdAt = row.original.created_at
			const formattedDay = format(new Date(createdAt), 'dd/MM/yyyy')
			const formattedHour = `às ${format(new Date(createdAt), 'HH:mm')}h`
			return (
				<div className="flex flex-col">
					<span className="text-sm">{formattedDay}</span>
					<span className="text-sm">{formattedHour}</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'updated_at',
		header: 'Atualizado em',
		cell: ({ row }) => {
			const updatedAt = row.original.updated_at
			const formattedDay = updatedAt
				? format(new Date(updatedAt), 'dd/MM/yyyy')
				: ''
			const formattedHour = updatedAt
				? `às ${format(new Date(updatedAt), 'HH:mm')}h`
				: ''
			return (
				<div className="flex flex-col">
					<span className="text-sm">{formattedDay}</span>
					<span className="text-sm">{formattedHour}</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status
			return (
				<Badge variant={BADGE[status]} className="text-xs font-medium">
					{STATUS[status]}
				</Badge>
			)
		},
	},

	{
		id: 'action',
		header: 'Ação',
		accessorKey: 'action',
		cell: ({ row }) => <ActionControl row={row} />,
	},
]
