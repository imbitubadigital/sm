'use client'

import Image from 'next/image'

import AudioPlayer from '@/components/audio-player'
import { AudioProvider } from '@/contexts/audio-context'

export default function Home() {
	const handleWhatsAppClick = () => {
		window.open(
			`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Olá! Gostaria de fazer uma música personalizada! Como devo proceder?`,
			'_blank',
		)
	}

	const demoSongs = [
		{
			id: '1',
			url: '/demos/cha-revelacao.mp3',
			title: 'Chá revelação - Mamãe Marina e Papai Paulo',
		},
		{
			id: '2',
			url: '/demos/ana-clara.mp3',
			title: 'Aniversário da esposa e mãe Ana Clara',
		},
		{
			id: '3',
			url: '/demos/marcelo.mp3',
			title: 'Homenagem pelo aniversário de casamento',
		},
		{
			id: '4',
			url: '/demos/andreza.mp3',
			title: 'Aniversário da querida Andreza',
		},
		{
			id: '5',
			url: '/demos/clarinha.mp3',
			title: 'Perdão Clarinha - esqueci nosso aniversário de namoro',
		},
		{
			id: '6',
			url: '/demos/cibele.mp3',
			title: 'Conquista - Cibele quero muito mais',
		},
		{
			id: '7',
			url: '/demos/roberto.mp3',
			title: 'Namoro a distância - Meu amado Roberto',
		},
	]

	return (
		<AudioProvider>
			<main className="min-h-screen bg-slate-950 flex flex-col">
				{/* Hero Section */}
				<section className="w-full relative">
					<div className="absolute inset-0 w-full bg-gradient-to-b from-orange-500/10 to-transparent" />
					<div className="container mx-auto px-4 py-20 text-center relative z-10">
						<div className="flex flex-col items-center justify-center mb-6">
							<Image
								src="/singer.png"
								alt="Logo Surpresa Musical"
								width={240}
								height={240}
								className="rounded-full mb-4 shadow-lg border-2 border-white/10"
							/>
							<h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
								Surpresa Musical
							</h1>
						</div>
						<div className="space-y-4 mb-8 max-w-3xl mx-auto">
							<p className="text-xl text-white/80">
								Crie memórias únicas com músicas personalizadas para pessoas
								especiais→
							</p>
							<p className="text-lg text-white/80">
								Imagine a emoção de presentear alguém querido com uma música
								feita exclusivamente para ela, contando sua história, destacando
								momentos especiais e expressando todo seu carinho.
							</p>
							<p className="text-lg text-white/80">
								Transforme o aniversário em um momento inesquecível com uma
								homenagem musical única, onde cada nota é composta pensando nos
								momentos mais marcantes da vida do aniversariante.
							</p>
						</div>
						<button
							type="button"
							onClick={handleWhatsAppClick}
							className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105"
						>
							Fazer Pedido pelo WhatsApp
						</button>
					</div>
				</section>

				{/* Como Funciona */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-white text-center mb-12">
						Como Funciona
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: 'Faça seu pedido',
								description:
									'Conte-nos sobre a pessoa especial e o que deseja expressar',
								gradient: 'from-pink-500/20 to-purple-500/20',
							},
							{
								title: 'Composição',
								description:
									'Nossa equipe criará a letra da música de forma única e personalizada',
								gradient: 'from-purple-500/20 to-blue-500/20',
							},
							{
								title: 'Entrega',
								description:
									'Receba sua música pronta para surpreender após o pagamento em até 1 dia útil',
								gradient: 'from-blue-500/20 to-cyan-500/20',
							},
						].map((step, index) => (
							<div
								key={String(index)}
								className={`bg-gradient-to-br ${step.gradient} p-6 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.07)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 backdrop-blur-sm relative overflow-hidden group`}
							>
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500" />
								<h3 className="text-xl font-bold text-white mb-4 relative z-10">
									{step.title}
								</h3>
								<p className="text-white/70 relative z-10">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Demonstrações de músicas 2 */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-white text-center mb-12">
						Ouça Nossas Demonstrações
					</h2>
					<div className="max-w-2xl mx-auto space-y-4">
						{demoSongs.map((song) => (
							<AudioPlayer key={song.id} {...song} />
						))}
					</div>
				</section>

				{/* Preço */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-white text-center mb-8">
						Preço Acessível
					</h2>
					<div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-8 rounded-xl shadow-lg text-center">
						<p className="text-xl text-white mb-4">
							Por apenas{' '}
							<span className="font-bold text-2xl">
								R$ {process.env.NEXT_PUBLIC_PRICE}
							</span>
							, você pode transformar um aniversário em um momento inesquecível.
						</p>
						<p className="text-lg text-white/80 mb-6">
							Uma música personalizada é um presente único e especial que será
							lembrado para sempre.
						</p>
						<button
							type="button"
							onClick={handleWhatsAppClick}
							className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105 inline-flex items-center gap-3"
						>
							<Image
								src="/whatsapp.png"
								alt="WhatsApp"
								width={28}
								height={28}
								className="w-7 h-7"
							/>
							<span>Solicitar Agora</span>
						</button>
					</div>
				</section>

				{/* CTA Final */}
				<section className="w-full relative">
					<div className="absolute inset-0 w-full bg-gradient-to-t from-orange-500/10 to-transparent" />
					<div className="container mx-auto px-4 py-20 text-center relative z-10">
						<h2 className="text-3xl font-bold text-white mb-8">
							Pronto para criar uma surpresa inesquecível?
						</h2>
						<button
							type="button"
							onClick={handleWhatsAppClick}
							className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105 inline-flex items-center gap-3"
						>
							<Image
								src="/whatsapp.png"
								alt="WhatsApp"
								width={28}
								height={28}
								className="w-7 h-7"
							/>
							<span>Começar Agora</span>
						</button>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-auto w-full bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/5">
					<div className="container mx-auto px-4 py-6">
						<div className="text-center">
							<p className="text-white/60 text-sm">
								© {new Date().getFullYear()} Surpresa Musical. Todos os direitos
								reservados.
							</p>
						</div>
					</div>
				</footer>
			</main>
		</AudioProvider>
	)
}
