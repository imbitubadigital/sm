export const STATUS: Record<string, string> = {
	'aguardando pagamento': 'Aguardando pagamento',
	'aguardando producao': 'Aguardando produção',
	'pagamento confirmado': 'Pagamento confirmado',
	'em produção': 'Em produção',
	'produção entregue': 'Produção entregue',
	'link gerado': 'Link de pagamento gerado',
	cancelado: 'Cancelado',
}

export const BADGE = {
	'aguardando pagamento': 'waiting',
	'aguardando producao': 'waiting',
	'pagamento confirmado': 'assas',
	'em produção': 'production',
	'link gerado': 'link',
	cancelado: 'destructive',
	'produção entregue': 'success',
} as Record<
	string,
	'waiting' | 'assas' | 'production' | 'link' | 'success' | 'destructive'
>
