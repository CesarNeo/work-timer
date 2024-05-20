'use client'

import { icons } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { INavLinkProps } from '../types'

function NavLink({ iconName, ...props }: INavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  const Icon = icons[iconName]

  return (
    <Link
      data-active={isActive}
      className="flex size-12 items-center justify-center border-b-4 border-transparent text-gray-400 outline-none transition-all hover:border-green-500 hover:text-gray-100 focus:outline focus:outline-green-500 data-[active=true]:text-green-500"
      {...props}
    >
      <Icon className="size-6" />
    </Link>
  )
}

export default NavLink
