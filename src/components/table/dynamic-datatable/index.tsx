'use client';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
// import {
// 	type ColumnDef,
// 	flexRender,
// 	getCoreRowModel,
// 	useReactTable,
// } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'

import { useQueryState } from 'nuqs'
//import qs from 'qs'
import { type ChangeEvent, useCallback, useMemo } from 'react'
//import useSWR from 'swr'

import { useDebounce } from '@/utils/debounce'
import { HeaderColumnDataTableProps } from '@/@types/header-column-data-table';
import { Button } from '@/components/ui/button';
import { CustomPaginationNext } from '../custom-pagination-next';

interface DataTableProps {
	//url: string
	columns: HeaderColumnDataTableProps[]
	sortColumns?: string[]
	defaultSortField?: string
	defaultSortDirection?: 'asc' | 'desc'
}

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



export function DynamicDataTable({
	columns,
	sortColumns = [],
	defaultSortField = '',
	defaultSortDirection = 'asc',
}: DataTableProps) {
	// const fetcher = useCallback(
	// 	(url: string) => fetch(url).then((res) => res.json()),
	// 	[],
	// )

	const [page, setPage] = useQueryState('page', { defaultValue: '1' })
	const [limit, setLimit] = useQueryState('limit', { defaultValue: '10' })
	const [type, setType] = useQueryState('type', { defaultValue: '' })
	const [q, setQ] = useQueryState('q', { defaultValue: '' })

	const [sortField, setSortField] = useQueryState('sortField', {
		defaultValue: defaultSortField || '',
	})
	const [sortDirection, setSortDirection] = useQueryState('sortDirection', {
		defaultValue: defaultSortDirection || '',
	})
	const isLoading = false

	// const { data, isLoading } = useSWR(
	// 	`${url}?${qs.stringify({ page, sortField, sortDirection, limit, type, q })}`,
	// 	fetcher,
	// )

	// const { items, metadata } = useMemo(() => {
	// 	return {
	// 		items: data?.items || [],
	// 		metadata: data?.metadata,
	// 	}
	// }, [data])

	// const pagesToRender = useMemo(() => {
	// 	if (!metadata) return []

	// 	const maxPagesToRender = 5

	// 	const pages = []
	// 	let startIndex = metadata.page - 2
	// 	let endIndex = metadata.page + 2

	// 	if (metadata.totalPages <= maxPagesToRender) {
	// 		startIndex = 1
	// 		endIndex = metadata.totalPages
	// 	} else {
	// 		if (startIndex < 1) {
	// 			startIndex = 1
	// 			endIndex = maxPagesToRender
	// 		}

	// 		if (endIndex > metadata.totalPages) {
	// 			startIndex = metadata.totalPages - maxPagesToRender + 1
	// 			endIndex = metadata.totalPages
	// 		}
	// 	}

	// 	for (let i = startIndex; i <= endIndex; i++) {
	// 		pages.push(i)
	// 	}

	// 	return pages
	// }, [metadata])

	// const table = useReactTable({
	// 	data: items,
	// 	columns,
	// 	getCoreRowModel: getCoreRowModel(),
	// })

	function handleUpdateSort(field: string) {
		setPage('1')
		setSortField(field)
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
	}
	function handleUpdateLimit(limit: string) {
		setPage('1')
		setLimit(limit)
	}
	function handleUpdateType(type: string) {
		setPage('1')
		setType(type === 'all' ? '' : type)
	}
	function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
		setPage('1')
		setQ(e.target.value)
	}

	return (
		<div className="grid gap-2">
			<div className="flex gap-2 justify-between">
				<div className="flex gap-2">
					<Input
						placeholder="Search by id or email"
						className="w-48"
						defaultValue={q}
						onChange={useDebounce(handleChangeSearch, 600)}
					/>
					<Select defaultValue={type || 'all'} onValueChange={handleUpdateType}>
						<SelectTrigger>
							<SelectValue placeholder="Select type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">TODOS</SelectItem>
							<SelectItem value="CREDIT">Crédito</SelectItem>
							<SelectItem value="DEBIT">Débito</SelectItem>
							<SelectItem value="TRANSFER">Transferência</SelectItem>
							<SelectItem value="PAYMENT">Pagamento</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select defaultValue={limit} onValueChange={handleUpdateLimit}>
						<SelectTrigger>
							<SelectValue placeholder="Select limit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10 Rows</SelectItem>
							<SelectItem value="20">20 Rows</SelectItem>
							<SelectItem value="50">50 Rows</SelectItem>
							<SelectItem value="100">100 Rows</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>

					<TableHeader>

							<TableRow>
								{columns.map((header) => {
									//const isSortable = sortColumns.includes(header.id)
									//const isSorted = sortField === header.id
									return (
										<TableHead key={header.id}>
											{header.header}
										</TableHead>
									)
								})}
							</TableRow>

					</TableHeader>
					{/* <TableBody>
						{!isLoading &&
							table.getRowModel().rows?.length > 0 &&
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))}
						{!isLoading && table.getRowModel().rows?.length <= 0 && (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Sem resultados.
								</TableCell>
							</TableRow>
						)}
						{isLoading && (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Carregando dados...
								</TableCell>
							</TableRow>
						)}
					</TableBody> */}
				</Table>
			</div>
			{!isLoading && (
				<footer className="w-full flex justify-between items-center gap-10">
					{/* <p className="flex-1 text-sm font-bold">
						Página {metadata.page} de {metadata.totalPages} com {metadata.total}{' '}
						resultados
					</p> */}
					<Pagination className="flex-1 justify-end">
						<PaginationContent>
							<PaginationItem>
								{/* <PaginationPrevious href="#" onClick={() => setPage('1')}>
									Primeiro
								</PaginationPrevious> */}
								{/* <CustomPaginationPrevious
									onClick={() => setPage('1')}
									disabled={!metadata.hasPreviousPage}
								>
									Primeiro
								</CustomPaginationPrevious> */}
							</PaginationItem>
							<PaginationItem>
								{/* <PaginationPrevious
									onClick={() => setPage(String(Number(page) - 1))}
								>
									Anterior
								</PaginationPrevious> */}

								{/* <CustomPaginationPrevious
									onClick={() => setPage(String(Number(page) - 1))}
									disabled={!metadata.hasPreviousPage}
								>
									Anterior
								</CustomPaginationPrevious> */}
							</PaginationItem>
							{/* <PaginationItem>
								<PaginationLink
									className={cn({
										underline: false,
									})}
								>
									1
								</PaginationLink>
							</PaginationItem> */}

							{/* {pagesToRender.map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										onClick={() => setPage(String(page))}
										className={cn({
											underline: page === metadata.page,
											'cursor-pointer': page !== metadata.page,
										})}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))} */}

							<PaginationItem>
								{/* <PaginationNext
									onClick={() => setPage(String(Number(page) + 1))}
								>
									Próxima
								</PaginationNext> */}
								{/* <CustomPaginationNext
									onClick={() => setPage(String(Number(page) + 1))}
									disabled={!metadata.hasNextPage}
								>
									Próxima
								</CustomPaginationNext> */}
							</PaginationItem>
							<PaginationItem>
								{/* <PaginationNext
									onClick={() => setPage(String(metadata.totalPages))}
								>
									Última
								</PaginationNext> */}
								{/* <CustomPaginationNext
									onClick={() => setPage(String(metadata.totalPages))}
									disabled={!metadata.hasNextPage}
								>
									Última
								</CustomPaginationNext> */}
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</footer>
			)}
		</div>
	)
}

