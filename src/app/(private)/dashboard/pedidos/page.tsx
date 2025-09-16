import { Orders } from '@/components/orders'
import { Suspense } from 'react'

export default function PageOrders() {
	return (
		<Suspense>
			<Orders />
		</Suspense>
	)
}
