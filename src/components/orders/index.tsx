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
		id: 'remoteJid',
		header: 'remoteJid',
		accessorKey: 'remoteJid',
	},
	{
		id: 'whatsapp',
		header: 'whatsapp',
		accessorKey: 'whatsapp',
	},
	{
		id: 'updated_at',
		header: 'updated_at',
		accessorKey: 'updated_at',
	},
	{
		id: 'honoree_age',
		header: 'honoree_age',
		accessorKey: 'honoree_age',
	},
	{
		id: 'kinship',
		header: 'kinship',
		accessorKey: 'kinship',
	},
	{
		id: 'tribute_reason',
		header: 'tribute_reason',
		accessorKey: 'tribute_reason',
	},
	{
		id: 'declaration',
		header: 'declaration',
		accessorKey: 'declaration',
	},
	{
		id: 'push_name',
		header: 'push_name',
		accessorKey: 'push_name',
	},
	{
		id: 'honoree_name',
		header: 'honoree_name',
		accessorKey: 'honoree_name',
	},
	{
		id: 'honoree_feature',
		header: 'honoree_feature',
		accessorKey: 'honoree_feature',
	},
	{
		id: 'music_style',
		header: 'music_style',
		accessorKey: 'music_style',
	},
	{
		id: 'other_declaration',
		header: 'other_declaration',
		accessorKey: 'other_declaration',
	},
]
 export function Orders() {
     return <div className="p-10">
         <DynamicDataTable columns={columns} />
     </div>
 }