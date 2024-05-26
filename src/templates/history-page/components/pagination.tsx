'use client'

import Link from 'next/link'
import { Children } from 'react'

import { useCyclesContext } from '@/contexts/cycles'
import { cn } from '@/utils/cn'

import type { IPaginationProps } from '../types'

function Pagination({ currentPage, ...props }: IPaginationProps) {
  const { cycles } = useCyclesContext()
  const totalPages = Math.ceil(cycles.length / 10)

  return (
    <nav
      {...props}
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center"
    >
      <ul className="flex flex-row items-center gap-1">
        {Children.toArray(
          Array.from({ length: totalPages }).map((_, index) => {
            const isActive = currentPage === index + 1

            return (
              <li>
                <Link
                  href={`?page=${index + 1}`}
                  scroll={false}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex size-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-600 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
                    {
                      'bg-gray-900 hover:bg-gray-600 hover:text-gray-100':
                        isActive,
                    },
                  )}
                >
                  {index + 1}
                </Link>
              </li>
            )
          }),
        )}
      </ul>
    </nav>
  )
}

export default Pagination
