import { AudioProvider } from '@/contexts/audio-context'
import { format } from 'date-fns'
import AudioPlayer from '../audio-player'
import { CustomCard } from '../card'
import type { OrderDetailProps } from './types'

export function OrderDetail({ data }: OrderDetailProps) {
	return (
		<AudioProvider>
			<div className="space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<CustomCard title="Cliente">
						<p>
							<span className="font-semibold text-sm">Informado</span>:{' '}
							{data.user as string}
						</p>
						<p>
							<span className="font-semibold text-sm">Nome do fone</span>:{' '}
							{data.push_name as string}
						</p>
					</CustomCard>
					<CustomCard title="Telefone">
						<p>
							<span className="font-semibold text-sm">Whatsapp</span>:{' '}
							{data.whatsapp as string}
						</p>
					</CustomCard>
					<CustomCard title="Homenageado(a)">
						<p>{data.honoree_name as string}</p>
					</CustomCard>
					<CustomCard title="Idade do homenageado(a)">
						<p>{data.honoree_age as string}</p>
					</CustomCard>

					<CustomCard title="Parentesco">
						<p>{data.kinship as string}</p>
					</CustomCard>
					<CustomCard title="Motivo da homenagem">
						<p>{data.tribute_reason as string}</p>
					</CustomCard>
					<CustomCard title="Estilo da música">
						<p>{data.music_style as string}</p>
					</CustomCard>
					<CustomCard title="Forma de pagamento">
						<p>{data.billing_type as string}</p>
					</CustomCard>
					<CustomCard title="Link de pagamento">
						{data.link_payment && (
							<a
								href={data.link_payment as string}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline"
							>
								Acessar link
							</a>
						)}
					</CustomCard>
					<CustomCard title="Música 01">
						{data.primary_audio_url && (
							<AudioPlayer
								id={'1'}
								url={data.primary_audio_url}
								title="Primeira versão"
								isTitleBlack
							/>
						)}
					</CustomCard>
					<CustomCard title="Música 02">
						{data.second_audio_url && (
							<AudioPlayer
								id={'2'}
								url={data.second_audio_url || ''}
								title="Segunda versão"
								isTitleBlack
							/>
						)}
					</CustomCard>
					<CustomCard title="Datas">
						<p className="text-sm">
							<span className="font-semibold text-sm">Criado em</span>:{' '}
							{format(data.created_at as Date, 'dd/MM/yyyy HH:mm')}
						</p>
						<p className="text-sm">
							<span className="font-semibold text-sm">Atualizado em</span>:{' '}
							{format(data.updated_at as Date, 'dd/MM/yyyy HH:mm')}
						</p>
					</CustomCard>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<CustomCard title="O que representa?">
						{data.honored_feature as string}
					</CustomCard>
					<CustomCard title="Declaração">
						{data.declaration as string}
					</CustomCard>

					<CustomCard title="Outras declarações">
						{data.other_declaration as string}
					</CustomCard>

					<CustomCard title="Adicionais ou correções">
						{data.additional_information as string}
					</CustomCard>
				</div>
			</div>
		</AudioProvider>
	)
}
