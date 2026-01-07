// filepath: /Users/drt65344/Projects/Personal/SM/surpresa-musical/src/components/tiktok/index.tsx
'use client'
import Script from 'next/script'

export function TikTokPixel() {
	return (
		<>
			<Script
				id="tiktok-pixel-script"
				src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D4K4LD3C77U3F3CUAS4G&lib=ttq"
				strategy="beforeInteractive"
			/>
			<Script id="tiktok-pixel-init" strategy="beforeInteractive">
				{`
                    window.TiktokAnalyticsObject = 'ttq';
                    window.ttq = window.ttq || [];
                    window.ttq.methods = [
                        "page","track","identify","instances","debug","on","off","once","ready","alias","group",
                        "enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"
                    ];
                    window.ttq.setAndDefer = function(t,e){
                        t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}
                    };
                    for(var i=0;i<window.ttq.methods.length;i++){
                        window.ttq.setAndDefer(window.ttq,window.ttq.methods[i]);
                    }
                    window.ttq.load && window.ttq.load('D4K4LD3C77U3F3CUAS4G');
                    window.ttq.page && window.ttq.page();
                `}
			</Script>
		</>
	)
}
