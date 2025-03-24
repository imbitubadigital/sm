import { logout } from '@/server/signin'
import { LogOut, SignatureIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import singer from '../../../public/singer.png'
import { Button } from '../ui/button'
export function PrivateHeader() {
	return (
		<header className="bg-gray-800 text-white py-2 mb-4">
			<div className="flex justify-between items-center px-8">
				<Link href="/dashboard">
					<div className="flex items-center justify-center gap-4">
						<Image
							src={singer}
							alt="Logo Surpresa Musical"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<h1 className="text-2xl font-bold text-white">Surpresa Musical</h1>
					</div>
				</Link>

				<div className="flex items-center gap-4">
					<Link
						href="/dashboard/pedidos"
						className="text-lg hover:text-orange-400"
					>
						Pedidos
					</Link>
					<Button variant={'ghost'} onClick={logout}>
						<LogOut size={60} />
					</Button>
				</div>
			</div>
		</header>
	)
}
