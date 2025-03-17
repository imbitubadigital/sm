import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function CustomPaginationNext({
	onClick,
	children,
	disabled = false,
}: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
	return (
		<Button
			variant="outline"
			size="sm"
			className="gap-1 pr-2.5"
			onClick={onClick}
			disabled={disabled}
		>
			{children}
			<ChevronRight className="h-4 w-4" />
		</Button>
	)
}