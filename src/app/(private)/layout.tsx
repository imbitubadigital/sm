import { logout } from '@/server'

export default function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<button type="button" onClick={logout}>
				SAIR
			</button>
			{children}
		</div>
	)
}
