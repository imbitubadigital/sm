export type ConfirmModalProps = {
	open: boolean
	onCloseModal: () => void
	title: string
	description: string
	onConfirm: () => void
	textConfirm: string
	textCancel: string
	load?: boolean
}
