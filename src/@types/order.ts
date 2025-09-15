export type OrderSm = {
	id: bigint
	created_at: Date
	billing_type: string | null
	code_payment: string | null
	declaration: string | null
	honored_feature: string | null
	honoree_age: string | null
	honoree_name: string | null
	kinship: string | null
	link_payment: string | null
	music_style: string | null
	other_declaration: string | null
	primary_audio_url: string | null
	push_name: string | null
	remoteJid: string | null
	second_audio_url: string | null
	status: string
	task_id: string | null
	tribute_reason: string | null
	updated_at: Date | null
	user: string | null
	whatsapp: string | null
	additional_information: string | null
	song_lyrics: string | null
}

export type PaginationOrders = {
	content: OrderSm[]
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
