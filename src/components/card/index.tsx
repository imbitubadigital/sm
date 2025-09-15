import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CustomCardProps } from './types'

export function CustomCard({ title, children }: CustomCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
