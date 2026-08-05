import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_app/home/')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
