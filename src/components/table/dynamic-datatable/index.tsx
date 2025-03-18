'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {

	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

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

import { ArrowUp} from 'lucide-react'

import { parseAsInteger, useQueryState } from 'nuqs'

import { type ChangeEvent, useMemo } from 'react'

import {format} from 'date-fns'
import { useDebounce } from '@/utils/debounce'
import { HeaderColumnDataTableProps } from '@/@types/header-column-data-table';

import { CustomPaginationNext } from '../custom-pagination-next';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/server';

import { CustomPaginationPrevious } from '../custom-pagination-previous';

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

	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(1))


	const [q, setQ] = useQueryState('q', { defaultValue: '' })

	const [sortField, setSortField] = useQueryState('sortField', {
		defaultValue: defaultSortField || '',
	})
	const [sortDirection, setSortDirection] = useQueryState('sortDirection', {
		defaultValue: defaultSortDirection || '',
	})


	const {data, isLoading} = useQuery({
		queryKey: ['todos', page, sortField, sortDirection, limit, q],
		queryFn: async () => await getAllOrders({search: q, limit, page}),
	})

console.log('cccc', data)


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



	return (
		<div className='w-full'>

			<div className="flex gap-2 justify-between">
				<div className="flex gap-2">
					<Input
						placeholder="Search by id or email"
						className="w-48"
						defaultValue={q}
						onChange={useDebounce(handleChangeSearch, 600)}
					/>

				</div>
				<div>
					<Select defaultValue={String(limit)} onValueChange={handleUpdateLimit}>
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
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map((cell) => {

           	const cellValue = cell.getValue();
			const formattedDate = cellValue !== undefined && (cell.column.columnDef.id === 'updated_at' || cell.column.columnDef.id === 'created_at') ? format(new Date(cellValue as Date), 'dd/MM/yyyy HH:mm:ss') : '';

          return (
            <TableCell key={cell.id}>

               {!!formattedDate ? formattedDate : flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
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
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Carregando dados...
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{!isLoading && data && data?.content.length > 0 && (
				<footer className="w-full flex justify-between items-center gap-10">
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

		</div>
	)
}

