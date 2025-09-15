import { Suspense } from 'react'
import { DynamicDataTable } from '../table/dynamic-datatable'

const columns = [
	{
		id: 'id',
		header: 'ID',
		accessorKey: 'id',
	},
	{
		id: 'status',
		header: 'Status',
		accessorKey: 'status',
	},
	{
		id: 'user',
		header: 'Cliente',
		accessorKey: 'user',
	},
	{
		id: 'push_name',
		header: 'Proprietário do número',
		accessorKey: 'push_name',
	},
	{
		id: 'whatsapp',
		header: 'Whatsapp',
		accessorKey: 'whatsapp',
	},
	{
		id: 'honoree_name',
		header: 'Homenageado(a)',
		accessorKey: 'honoree_name',
	},
	{
		id: 'honoree_age',
		header: 'Idade',
		accessorKey: 'honoree_age',
	},
	{
		id: 'kinship',
		header: 'Parentesco',
		accessorKey: 'kinship',
	},
	{
		id: 'tribute_reason',
		header: 'Motivo',
		accessorKey: 'tribute_reason',
	},
	{
		id: 'honored_feature',
		header: 'Característica',
		accessorKey: 'honored_feature',
	},
	{
		id: 'declaration',
		header: 'Declaração',
		accessorKey: 'declaration',
	},
	{
		id: 'other_declaration',
		header: 'Outras palavras',
		accessorKey: 'other_declaration',
	},

	{
		id: 'music_style',
		header: 'Estilo',
		accessorKey: 'music_style',
	},
	{
		id: 'link_payment',
		header: 'Link de pagamento',
		accessorKey: 'link_payment',
	},
	{
		id: 'billing_type',
		header: 'Tipo de pagamento',
		accessorKey: 'billing_type',
	},
	{
		id: 'primary_audio_url',
		header: 'Música 01',
		accessorKey: 'primary_audio_url',
	},
	{
		id: 'second_audio_url',
		header: 'Música 02',
		accessorKey: 'second_audio_url',
	},

	{
		id: 'updated_at',
		header: 'Atualizado em',
		accessorKey: 'updated_at',
	},
	{
		id: 'created_at',
		header: 'Cadastro em',
		accessorKey: 'created_at',
	},
	{
		id: 'action',
		header: 'Ação',
		accessorKey: 'action',
	},
]
export function Orders() {
	return (
		<div className="p-4">
			<Suspense fallback={<div>Loading...</div>}>
				<DynamicDataTable columns={columns} />
			</Suspense>
		</div>
	)
}
