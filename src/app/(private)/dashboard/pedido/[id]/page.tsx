'use client'

import { CustomCard } from '@/components/card'
import { BADGE, STATUS } from '@/components/orders/data-type'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/server/order'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'

export default function OrderPage() {
	const router = useRouter()
	const param = useParams<{ id: string }>()
	const { id } = param

	const KEY_QUERY = ['order', id]

	const { data, isLoading } = useQuery({
		queryKey: KEY_QUERY,
		queryFn: async () => await getOrder(Number(id)),
	})

	console.log({ data, isLoading })

	return (
		<div className="p-4">
			{data !== null && data !== undefined && (
				<div>
					<div className="flex justify-between items-center mb-4">
						<div className="flex gap-4 items-center justify-start">
							<h3>
								Pedido N.º: <span>{id}</span>
							</h3>
							<Badge
								variant={BADGE[data.status]}
								className="text-xs font-medium"
							>
								{STATUS[data.status]}
							</Badge>
						</div>
						<div className="flex gap-6 items-center">
							<Button
								variant={'secondary'}
								className="cursor-pointer"
								onClick={() => router.back()}
							>
								Voltar
							</Button>
							<div>
								<Button
									variant={'secondary'}
									className="cursor-pointer"
									//onClick={() => router.back()}
								>
									abrir
								</Button>
								<Button
									variant={'secondary'}
									className="cursor-pointer"
									//onClick={() => router.back()}
								>
									abrir 2
								</Button>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-4">
						<CustomCard title="Cliente">
							<p>
								<span className="font-semibold text-sm">Informado</span>:{' '}
								{data?.user as string}
							</p>
							<p>
								<span className="font-semibold text-sm">Original fone</span>:{' '}
								{data?.push_name as string}
							</p>
						</CustomCard>
						<CustomCard title="Telefone">
							<p>
								<span className="font-semibold text-sm">Whatsapp</span>:{' '}
								{data?.whatsapp as string}
							</p>
						</CustomCard>
						<CustomCard title="Homenageado(a)">
							<p>{data?.honoree_name as string}</p>
						</CustomCard>
						<CustomCard title="Idade do homenageado(a)">
							<p>{data?.honoree_age as string}</p>
						</CustomCard>

						<CustomCard title="Parentesco">
							<p>{data?.kinship as string}</p>
						</CustomCard>
						<CustomCard title="Motivo da homenagem">
							<p>{data?.tribute_reason as string}</p>
						</CustomCard>
						<CustomCard title="Estilo da música">
							<p>{data?.music_style as string}</p>
						</CustomCard>
						<CustomCard title="Forma de pagamento">
							<p>{data?.billing_type as string}</p>
						</CustomCard>
						<CustomCard title="Link de pagamento">
							{data?.link_payment && (
								<a
									href={data?.link_payment as string}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline"
								>
									Acessar link
								</a>
							)}
						</CustomCard>
						<CustomCard title="Música 01">
							{data?.primary_audio_url && (
								<a
									href={data?.primary_audio_url as string}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline"
								>
									Primeira música
								</a>
							)}
						</CustomCard>
						<CustomCard title="Música 01">
							{data?.second_audio_url && (
								<a
									href={data?.second_audio_url as string}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline"
								>
									Segunda música
								</a>
							)}
						</CustomCard>
						<CustomCard title="Datas">
							<p>
								<span className="font-semibold text-sm">Criado em</span>:{' '}
								{format(data?.created_at as Date, 'dd/MM/yyyy HH:mm')}
							</p>
							<p>
								<span className="font-semibold text-sm">Atualizado em</span>:{' '}
								{format(data?.updated_at as Date, 'dd/MM/yyyy HH:mm')}
							</p>
						</CustomCard>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-4">
						<CustomCard title="O que representa?">
							{data?.honored_feature as string}
						</CustomCard>
						<CustomCard title="Declaração">
							{data?.declaration as string}
						</CustomCard>

						<CustomCard title="Outras declarações">
							{data?.other_declaration as string}
						</CustomCard>

						<CustomCard title="Adicionais ou correções">
							{data?.additional_information as string}
						</CustomCard>
					</div>

					<div className="mt-4">
						<CustomCard title="Letra da música">
							{(data?.song_lyrics ?? '')
								.split('\n')
								.map((line, index) =>
									line.trim() === '' ? (
										<br key={String(index)} />
									) : (
										<p key={String(index)}>{line}</p>
									),
								)}
						</CustomCard>
					</div>
				</div>
			)}
		</div>
	)
}
