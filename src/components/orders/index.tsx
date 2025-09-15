'use client'
import type { Metadata } from '@/@types/metadata'
import { getAllOrders } from '@/server/order'
import { useQuery } from '@tanstack/react-query'

import { parseAsInteger, useQueryState } from 'nuqs'

import { DataTable } from '../datatable'
import { FooterPagination } from '../pagination'

import { columns } from './columns'

export function Orders() {
	const [page] = useQueryState('page', parseAsInteger)
	const [limit] = useQueryState('limit', parseAsInteger)

	const [q] = useQueryState('q', { defaultValue: '' })
	const [sort] = useQueryState('sort', { defaultValue: '' })

	const KEY_QUERY = ['paginate-order', page, sort, limit, q]

	const { data, isLoading } = useQuery({
		queryKey: KEY_QUERY,
		queryFn: async () =>
			await getAllOrders({ search: q, limit: limit || 12, page: page || 1 }),
	})

	const metadata = {
		page: data?.page || 1,
		limit: data?.limit || 10,
		pages: data?.totalPages || 0,
		elements: data?.totalElements || 0,
	} as Metadata

	return (
		<div className="p-4">
			<DataTable
				columns={columns}
				data={data?.content || []}
				isLoading={isLoading}
			/>
			{!isLoading && data && data.content.length > 0 && (
				<FooterPagination metadata={metadata || ({} as Metadata)} />
			)}
		</div>
	)
}
