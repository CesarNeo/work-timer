import type { icons } from 'lucide-react'
import type Link from 'next/link'
import type { ComponentProps } from 'react'

type INavLinkProps = ComponentProps<typeof Link> & {
  iconName: keyof typeof icons
}

export type { INavLinkProps }
