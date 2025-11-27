'use client'
import Script from 'next/script'

export function TikTokPixel() {
	return (
		<>
			<Script
				id="tiktok-pixel-loader"
				strategy="afterInteractive"
				src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D4K4LD3C77U3F3CUAS4G&lib=ttq"
			/>
			<Script id="tiktok-pixel-init" strategy="afterInteractive">
				{`
                    if (window.ttq && typeof window.ttq.page === 'function') {
                        window.ttq.load('D4K4LD3C77U3F3CUAS4G');
                        window.ttq.page();
                    }
                `}
			</Script>
		</>
	)
}
