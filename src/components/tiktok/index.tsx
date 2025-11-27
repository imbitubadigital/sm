'use client'
import { useEffect } from 'react'

export function TikTokPixel() {
	useEffect(() => {
		if (window.ttq) return

		const script = document.createElement('script')
		script.src =
			'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D4K4LD3C77U3F3CUAS4G&lib=ttq'
		script.async = true
		script.onload = () => {
			if (window.ttq) {
				window.ttq.page()
			}
		}
		document.head.appendChild(script)
	}, [])

	return null
}
