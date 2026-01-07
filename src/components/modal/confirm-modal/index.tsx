import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { LoaderCircleIcon } from 'lucide-react'
import type { ConfirmModalProps } from './types'

export function ConfirmModal({
	open,
	onCloseModal,
	title,
	description,
	onConfirm,
	textConfirm,
	textCancel,
	load = false,
}: ConfirmModalProps) {
	return (
		<>
			<AlertDialog open={open} onOpenChange={onCloseModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={load}>{textCancel}</AlertDialogCancel>
						<AlertDialogAction disabled={load} onClick={onConfirm}>
							{!load && textConfirm}

							{load && <LoaderCircleIcon className="animate-spin" />}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
