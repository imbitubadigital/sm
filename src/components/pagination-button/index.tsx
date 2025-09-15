import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import { Button } from '../ui/button'

type PaginationButtonProps = {
	onClick?: () => void
	disabled?: boolean
	type: 'next' | 'previous' | 'first' | 'last'
}

export function PaginationButton({
	onClick,

	disabled = false,
	type,
}: PaginationButtonProps) {
	return (
		<Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>
			{type === 'first' && <ChevronFirstIcon className="h-4 w-4" />}
			{type === 'previous' && <ChevronLeft className="h-4 w-4" />}

			{type === 'next' && <ChevronRight className="h-4 w-4" />}
			{type === 'last' && <ChevronLastIcon className="h-4 w-4" />}
		</Button>
	)
}
