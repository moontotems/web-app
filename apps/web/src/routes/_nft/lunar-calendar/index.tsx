import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_nft/lunar-calendar/')({
  beforeLoad: () => {
    throw redirect({ to: '/lunar-phases' })
  },
})
