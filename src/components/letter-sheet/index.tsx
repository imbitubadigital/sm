import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
// Ajuste o import conforme necessário
import type { LetterSheetProps } from './types'

export function LetterSheet({ onClose, open, lyrics }: LetterSheetProps) {
	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(lyrics || '')
			.then(() => {
				toast.success('Letra copiada para a área de transferência')
			})
			.catch((err) => {
				console.error('Erro ao copiar texto: ', err)
			})
	}

	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="flex items-center justify-start gap-2">
						Letra da música
						<Button
							variant="ghost"
							onClick={copyToClipboard}
							className="p-2 hover:bg-gray-100 rounded-full"
							title="Copiar letra"
						>
							<Copy size={20} />
						</Button>
					</SheetTitle>
				</SheetHeader>
				<div className="px-4  mb-8">
					<ScrollArea className="h-[calc(100vh-100px)] w-full">
						{!lyrics && (
							<div className="text-muted-foreground text-sm">
								Letra não disponível
							</div>
						)}
						{(lyrics ?? '').split('\n').map((line, index) =>
							line.trim() === '' ? (
								<br key={String(index)} />
							) : (
								<div
									key={String(index)}
									className="text-muted-foreground text-sm"
								>
									{line}
								</div>
							),
						)}
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	)
}
