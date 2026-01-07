export const STATUS: Record<string, string> = {
	'aguardando pagamento': 'Aguardando pagamento',
	'aguardando producao': 'Aguardando produção',
	produzida: 'Música produzida',
	'pagamento confirmado': 'Pagamento confirmado',
	'em produção': 'Em produção',
	'produção entregue': 'Produção entregue',
	'produção entregue manualmente': 'Produção entregue manualmente',
	'link gerado': 'Link de pagamento gerado',
	cancelado: 'Cancelado',
}

export const BADGE = {
	'aguardando pagamento': 'waiting',
	'aguardando producao': 'waiting',
	produzida: 'secondary',
	'pagamento confirmado': 'assas',
	'em produção': 'production',
	'link gerado': 'link',
	cancelado: 'destructive',
	'produção entregue': 'success',
	'produção entregue manualmente': 'success',
} as Record<
	string,
	| 'waiting'
	| 'assas'
	| 'production'
	| 'link'
	| 'success'
	| 'destructive'
	| 'secondary'
>
