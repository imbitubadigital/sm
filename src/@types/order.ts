export type OrdersProps = {
	id: string | number | bigint
	status: string
	created_at: string | Date
	user: string | null
	remoteJid: string | null
	whatsapp: string | null
	updated_at: string | Date | null
	honoree_name: string | null
	honoree_age: string | null
	kinship: string | null
	tribute_reason: string | null
	honored_feature: string | null
	declaration: string | null
	push_name: string | null
	music_style: string | null
	other_declaration: string | null
}

export type PaginationOrders = {
	content: OrdersProps[]
	page: number
	limit: number
	totalElements: number
	totalPages: number
}

export type SearchPaginate = {
	search: string
	limit: number
	page: number
}
export type TestePaginate = {
	search: string
	limit: number
	page: number
}
