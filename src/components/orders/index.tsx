import { DynamicDataTable } from "../table/dynamic-datatable"


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
		id: 'music_style',
		header: 'Estilo',
		accessorKey: 'music_style',
	},
	// {
	// 	id: 'declaration',
	// 	header: 'Declaração',
	// 	accessorKey: 'declaration',
	// },
	// {
	// 	id: 'other_declaration',
	// 	header: 'Outras palavras',
	// 	accessorKey: 'other_declaration',
	// },

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
     return <div className="p-10">
         <DynamicDataTable columns={columns} />
     </div>
 }