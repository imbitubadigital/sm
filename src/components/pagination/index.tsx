import { cn } from '@/lib/utils'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

import type { Metadata } from '@/@types/metadata'
import { PaginationButton } from '../pagination-button'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '../ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

type FooterPaginationProps = {
	metadata: Metadata
	limitStart?: number
}

export function FooterPagination({
	metadata,
	limitStart = 12,
}: FooterPaginationProps) {
	const pagesToRender = useMemo(() => {
		const maxPagesToRender = 5

		const pages = []
		let startIndex = metadata.page - 2
		let endIndex = metadata.page + 2

		if (metadata.pages <= maxPagesToRender) {
			startIndex = 1
			endIndex = metadata.pages
		} else {
			if (startIndex < 1) {
				startIndex = 1
				endIndex = maxPagesToRender
			}

			if (endIndex > metadata.pages) {
				startIndex = metadata.pages - maxPagesToRender + 1
				endIndex = metadata.pages
			}
		}

		for (let i = startIndex; i <= endIndex; i++) {
			pages.push(i)
		}

		return pages
	}, [metadata.page, metadata.pages])

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

	const [limit, setLimit] = useQueryState(
		'limit',
		parseAsInteger.withDefault(limitStart),
	)

	const handleUpdateLimit = useCallback(
		(limit: string) => {
			setPage(1)
			setLimit(Number(limit))
		},
		[setLimit, setPage],
	)

	const handleUpdatePage = useCallback(
		(pageNumber: number) => {
			setPage(pageNumber)
		},
		[setPage],
	)
	return (
		<footer className="w-full flex justify-between items-center gap-10 mt-6">
			<div className="flex items-center gap-2">
				<p className="flex-1 text-sm font-bold">
					Página {metadata?.page} de {metadata?.pages} com {metadata?.elements}{' '}
					resultados
				</p>

				<Select value={String(limit)} onValueChange={handleUpdateLimit}>
					<SelectTrigger>
						<SelectValue placeholder="Select limit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="12">12 por página</SelectItem>
						<SelectItem value="20">20 por página</SelectItem>
						<SelectItem value="50">50 por página</SelectItem>
						<SelectItem value="100">100 por página</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Pagination className="flex-1 justify-end">
				<PaginationContent>
					<PaginationItem>
						<PaginationButton
							type="first"
							onClick={() => handleUpdatePage(1)}
							disabled={metadata?.page === 1}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationButton
							type="previous"
							onClick={() => handleUpdatePage(metadata?.page - 1)}
							disabled={metadata?.page === 1}
						/>
					</PaginationItem>

					{pagesToRender.map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() => handleUpdatePage(Number(page))}
								className={cn({
									'cursor-pointer': page !== metadata.page,
									'bg-primary': page === metadata.page,
									'text-white': page === metadata.page,
								})}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationButton
							type="next"
							onClick={() => handleUpdatePage(metadata.page + 1)}
							disabled={metadata.page === metadata.pages}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationButton
							type="last"
							onClick={() => handleUpdatePage(metadata.pages)}
							disabled={metadata.page === metadata.pages}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</footer>
	)
}
