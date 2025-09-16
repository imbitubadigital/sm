import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { getRowColor } from '@/utils/row-color'
import { LoaderIcon } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	isLoading: boolean
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setSortParam] = useQueryState('sort')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [__, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: (newSorting) => {
			const updatedSorting =
				typeof newSorting === 'function' ? newSorting(sorting) : newSorting
			setSorting(updatedSorting)

			if (updatedSorting.length > 0) {
				const [{ id, desc }] = updatedSorting
				setSortParam(`${id}:${desc ? 'desc' : 'asc'}`)
				setPage(1)
			} else {
				setSortParam(null)
			}
		},
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	return (
		<div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="cursor-pointer text-sm font-semibold h-14"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading && data.length < 1 ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="min-h-[400px]">
									<div className="flex justify-center items-center min-h-[calc(100vh-260px)]">
										<LoaderIcon
											size={60}
											className="animate-spin text-gray-400"
										/>
									</div>
								</TableCell>
							</TableRow>
						) : data.length > 0 ? (
							table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={getRowColor(index)}
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
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Nenhum resultado encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
