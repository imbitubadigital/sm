import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function CustomPaginationPrevious({
	onClick,
	children,
	disabled = false,
}: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
	return (
		<Button
			variant="outline"
			size="sm"
			className="gap-1 pl-2.5"
			onClick={onClick}
			disabled={disabled}
		>
			<ChevronLeft className="h-4 w-4" />
			{children}
		</Button>
	)
}