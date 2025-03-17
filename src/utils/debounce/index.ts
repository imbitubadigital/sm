import { useRef } from 'react'

type DebounceFunction = (...args: any[]) => void

export function useDebounce(fn: DebounceFunction, delay: number) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	function debounceFn(...args: any[]) {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			fn(...args)
		}, delay)
	}

	return debounceFn
}
