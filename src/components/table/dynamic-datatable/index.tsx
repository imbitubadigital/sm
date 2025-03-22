'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	type Cell,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

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
import { cn } from '@/lib/utils'

import { ArrowUp, Edit, LoaderCircleIcon } from 'lucide-react'

import { parseAsInteger, useQueryState } from 'nuqs'

import { type ChangeEvent, useMemo, useState } from 'react'

import type { HeaderColumnDataTableProps } from '@/@types/header-column-data-table'
import { useDebounce } from '@/utils/debounce'
import { format } from 'date-fns'

import { useQuery } from '@tanstack/react-query'
import { CustomPaginationNext } from '../custom-pagination-next'

import type { OrdersProps } from '@/@types/order'
import { StatusOrderModal } from '@/components/modal/status-order-modal'
import { getAllOrders } from '@/server/order'
import { CustomPaginationPrevious } from '../custom-pagination-previous'

interface DataTableProps {
	//url: string
	columns: HeaderColumnDataTableProps[]
	sortColumns?: string[]
	defaultSortField?: string
	defaultSortDirection?: 'asc' | 'desc'
}

export function DynamicDataTable({
	columns,
	sortColumns = [],
	defaultSortField = '',
	defaultSortDirection = 'asc',
}: DataTableProps) {
	const [show, setShow] = useState(false)
	const [cell, setCell] = useState<Cell<OrdersProps, unknown> | null>(null)
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [limit, setLimit] = useQueryState(
		'limit',
		parseAsInteger.withDefault(1),
	)

	const [q, setQ] = useQueryState('q', { defaultValue: '' })

	const [sortField, setSortField] = useQueryState('sortField', {
		defaultValue: defaultSortField || '',
	})
	const [sortDirection, setSortDirection] = useQueryState('sortDirection', {
		defaultValue: defaultSortDirection || '',
	})
	const KEY_QUERY = ['todos', page, sortField, sortDirection, limit, q]

	const { data, isLoading } = useQuery({
		queryKey: KEY_QUERY,
		queryFn: async () => await getAllOrders({ search: q, limit, page }),
	})

	const pagesToRender = useMemo(() => {
		if (!data?.content) return []

		const maxPagesToRender = 5

		const pages = []
		let startIndex = data.page - 2
		let endIndex = data.page + 2

		if (data.totalPages <= maxPagesToRender) {
			startIndex = 1
			endIndex = data.totalPages
		} else {
			if (startIndex < 1) {
				startIndex = 1
				endIndex = maxPagesToRender
			}

			if (endIndex > data.totalPages) {
				startIndex = data.totalPages - maxPagesToRender + 1
				endIndex = data.totalPages
			}
		}

		for (let i = startIndex; i <= endIndex; i++) {
			pages.push(i)
		}

		return pages
	}, [data])

	function handleUpdateSort(field: string) {
		setPage(1)
		setSortField(field)
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
	}
	function handleUpdateLimit(limit: string) {
		setPage(1)
		setLimit(Number(limit))
	}

	function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
		setPage(1)
		setQ(e.target.value)
	}

	const table = useReactTable({
		data: data?.content || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const handleRenderRow = (cell: Cell<OrdersProps, unknown>) => {
		const cellValue = cell.getValue()

		if (
			(cell.column.columnDef.id === 'updated_at' ||
				cell.column.columnDef.id === 'created_at') &&
			cellValue !== undefined
		) {
			return format(new Date(cellValue as Date), 'dd/MM/yyyy HH:mm:ss')
		}

		if (cell.column.columnDef.id === 'action') {
			const orderId = cell.row.original.id
			return (
				<Edit
					className="text-primary"
					onClick={() => oPenModal(cell)}
					size={20}
				/>
			)
		}
		return flexRender(cell.column.columnDef.cell, cell.getContext())
	}

	function oPenModal(cell: Cell<OrdersProps, unknown>) {
		setCell(cell)
		setShow(true)
	}

	return (
		<div className="w-full">
			<div className="flex gap-2 justify-between mb-4">
				<div className="flex gap-2">
					<Input
						placeholder="Search by id or email"
						className="w-48"
						defaultValue={q}
						onChange={useDebounce(handleChangeSearch, 600)}
					/>
				</div>
				<div>
					<Select
						defaultValue={String(limit)}
						onValueChange={handleUpdateLimit}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select limit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">10 Rows</SelectItem>
							<SelectItem value="20">20 Rows</SelectItem>
							<SelectItem value="50">50 Rows</SelectItem>
							<SelectItem value="100">100 Rows</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const isSortable = sortColumns.includes(header.id)
									const isSorted = sortField === header.id
									return (
										<TableHead key={header.id}>
											<div
												className={cn('flex items-center gap-0.5', {
													'cursor-pointer hover:text-foreground': isSortable,
													'text-foreground': isSorted,
												})}
												onClick={
													isSortable
														? () => handleUpdateSort(header.id)
														: undefined
												}
												onKeyDown={() => {}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
												{isSorted && (
													<ArrowUp
														className={cn('ml-2 h-4 - w-4', {
															'rotate-180': sortDirection === 'desc',
														})}
													/>
												)}
											</div>
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{!isLoading &&
							table.getRowModel().rows?.length > 0 &&
							table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-nome'}`}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<TableCell key={cell.id}>
												{handleRenderRow(cell)}
											</TableCell>
										)
									})}
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
								<TableCell colSpan={columns.length} className="text-center">
									<div className="min-h-[400px] flex justify-center items-center ">
										<LoaderCircleIcon
											size={60}
											className="text-primary animate-spin"
										/>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{!isLoading && data && data?.content.length > 0 && (
				<footer className="w-full flex justify-between items-center gap-10 mt-4">
					<p className="flex-1 text-sm font-bold">
						Página {data?.page} de {data?.totalPages} com {data?.totalElements}{' '}
						resultados
					</p>
					<Pagination className="flex-1 justify-end">
						<PaginationContent>
							<PaginationItem>
								<CustomPaginationPrevious
									onClick={() => setPage(1)}
									disabled={data?.page === 1}
								>
									Primeiro
								</CustomPaginationPrevious>
							</PaginationItem>
							<PaginationItem>
								<CustomPaginationPrevious
									onClick={() => setPage(data?.page - 1)}
									disabled={data?.page === 1}
								>
									Anterior
								</CustomPaginationPrevious>
							</PaginationItem>

							{pagesToRender.map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										onClick={() => setPage(Number(page))}
										className={cn({
											underline: page === data.page,
											'cursor-pointer': page !== data.page,
										})}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<CustomPaginationNext
									onClick={() => setPage(data.page + 1)}
									disabled={data.page === data.totalPages}
								>
									Próxima
								</CustomPaginationNext>
							</PaginationItem>
							<PaginationItem>
								<CustomPaginationNext
									onClick={() => setPage(data.totalPages)}
									disabled={data.page === data.totalPages}
								>
									Última
								</CustomPaginationNext>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</footer>
			)}
			<StatusOrderModal
				isOpen={show}
				onClose={() => setShow(false)}
				cell={cell}
				keyQuery={KEY_QUERY}
			/>
		</div>
	)
}
