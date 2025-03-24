import { PrivateHeader } from '@/components/private-header'

export default function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<PrivateHeader />
			{children}
		</div>
	)
}
