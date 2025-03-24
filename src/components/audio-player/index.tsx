'use client'

import { useAudioContext } from '@/contexts/audio-context'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type AudioPlayerProps = {
	url: string
	title: string
	id: string
}

const AudioPlayer = ({ url, title, id }: AudioPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)
	const { currentPlayingId, setCurrentPlayingId } = useAudioContext()

	useEffect(() => {
		if (currentPlayingId !== id && isPlaying) {
			audioRef.current?.pause()
			if (audioRef.current) {
				audioRef.current.currentTime = 0
			}
			setIsPlaying(false)
		}
	}, [currentPlayingId, id, isPlaying])

	const handleTogglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
				audioRef.current.currentTime = 0
				setCurrentPlayingId(null)
			} else {
				setCurrentPlayingId(id)
				audioRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	useEffect(() => {
		const audio = audioRef.current

		const handleEnded = () => {
			setIsPlaying(false)
			setCurrentPlayingId(null)
			if (audio) {
				audio.currentTime = 0
			}
		}

		audio?.addEventListener('ended', handleEnded)

		return () => {
			audio?.removeEventListener('ended', handleEnded)
		}
	}, [setCurrentPlayingId])

	const bt = !isPlaying
		? 'w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 relative z-10'
		: 'w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-300 hover:from-green-800 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 relative z-10'

	return (
		<div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.07)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 group relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500" />
			<div className="min-w-[48px] min-h-[48px] flex-shrink-0">
				<button
					type="button"
					onClick={handleTogglePlay}
					className={bt}
					aria-label={isPlaying ? 'Pausar' : 'Tocar'}
				>
					{isPlaying ? (
						<span className="text-white text-2xl">
							<Pause />
						</span>
					) : (
						<span className=" text-white text-2xl">
							<Play />
						</span>
					)}
				</button>
			</div>
			<div className="relative z-10 flex-1 min-w-0">
				<p className="text-white font-medium whitespace-normal pr-2">{title}</p>
			</div>

			<audio ref={audioRef} src={url}>
				<track kind="captions" src="/" label="Legendas" srcLang="pt-BR" />
				<p>Seu navegador não suporta o elemento de áudio.</p>
			</audio>
		</div>
	)
}

export default AudioPlayer
