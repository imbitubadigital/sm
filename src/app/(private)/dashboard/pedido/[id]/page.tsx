'use client'

import { LetterSheet } from '@/components/letter-sheet'
import { OrderFormFirstStepModal } from '@/components/modal/order-form-first-step-modal'
import { StatusOrderModal } from '@/components/modal/status-order-modal'
import { OrderDetail } from '@/components/order-detail'
import { BADGE, STATUS } from '@/components/orders/data-type'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import { getOrder } from '@/server/order'
import { useQuery } from '@tanstack/react-query'

import { LoaderIcon, MoreVertical } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OrderPage() {
	const router = useRouter()
	const param = useParams<{ id: string }>()
	const [openSheet, setOpenSheet] = useState(false)
	const [showStatusModal, setShowStatusModal] = useState(false)
	const [showFirstStepModal, setShowFirstStepModal] = useState(false)
	const { id } = param

	const KEY_QUERY = ['order', id]

	const { data, isLoading } = useQuery({
		queryKey: KEY_QUERY,
		queryFn: async () => await getOrder(Number(id)),
	})

	console.log({ data, isLoading })

	return (
		<>
			{isLoading && (data === null || data === undefined) && (
				<div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
					<LoaderIcon size={60} className="animate-spin text-gray-400" />
				</div>
			)}
			{data !== null && data !== undefined && (
				<div className="p-4">
					<div>
						<div className="flex justify-between items-center  mb-4">
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
							<div className="flex gap-4 items-center">
								<Button
									variant={'link'}
									className="cursor-pointer"
									onClick={() => router.back()}
								>
									Voltar
								</Button>

								<NavigationMenu viewport={false}>
									<NavigationMenuList>
										<NavigationMenuItem>
											<NavigationMenuTrigger className="bg-transparent hover:bg-transparent [&>svg:last-child]:hidden focus:bg-transparent data-[state=open]:hover:transparent font-medium text-lg">
												<MoreVertical />
											</NavigationMenuTrigger>
											<NavigationMenuContent className="bg-white !absolute !right-0 !left-auto !transform-none">
												<NavigationMenuLink
													className="w-[180px] cursor-pointer "
													onClick={() => setOpenSheet(true)}
												>
													Ver letra
												</NavigationMenuLink>
												<NavigationMenuLink
													className="w-[180px] cursor-pointer "
													onClick={() => setShowStatusModal(true)}
												>
													Alterar status
												</NavigationMenuLink>
												<NavigationMenuLink
													className="w-[180px] cursor-pointer "
													onClick={() => setShowFirstStepModal(true)}
												>
													Editar dados primários
												</NavigationMenuLink>
												<NavigationMenuLink
													className="w-[180px] cursor-pointer "
													//onClick={() => setOpenSheet(true)}
												>
													Editar dados secundários
												</NavigationMenuLink>
											</NavigationMenuContent>
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
							</div>
						</div>

						<OrderDetail data={data} />
						<LetterSheet
							open={openSheet}
							onClose={() => setOpenSheet(false)}
							lyrics={data?.song_lyrics}
						/>

						<StatusOrderModal
							isOpen={showStatusModal}
							onClose={() => setShowStatusModal(false)}
							cell={data}
							keyQuery={KEY_QUERY}
						/>
						<OrderFormFirstStepModal
							isOpen={showFirstStepModal}
							onClose={() => setShowFirstStepModal(false)}
							order={data}
							keyQuery={KEY_QUERY}
						/>
					</div>
				</div>
			)}
		</>
	)
}
