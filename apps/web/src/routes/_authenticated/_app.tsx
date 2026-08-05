import { AppLayout, type NavUserUser } from '@moontotems/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { DatabaseIcon, MapIcon } from 'lucide-react'
import { toast } from 'sonner'

import { logoutFn } from '~/lib/auth/server'

const Layout = () => {
  const { user } = Route.useRouteContext()
  const queryClient = useQueryClient()

  const logOutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: async () => {
      toast.success('Logout successful')
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`)
    },
  })

  const sidebarUser: NavUserUser | undefined = user
    ? {
        name: user.email ?? 'Account',
        email: user.email ?? '',
        initials: (user.email ?? 'U').slice(0, 2).toUpperCase(),
      }
    : undefined

  return (
    <AppLayout
      headerProps={{ title: 'Documents' }}
      sidebarProps={{
        user: sidebarUser,
        onLogout: () => logOutMutation.mutate(undefined),
        navMain: [{ title: 'News Path', url: '/news-path', icon: MapIcon }],
        userMenuItems: [
          {
            label: 'Local DB',
            icon: DatabaseIcon,
            href: 'http://127.0.0.1:54423/project/default',
            external: true,
          },
        ],
      }}
    >
      <Outlet />
    </AppLayout>
  )
}

export const Route = createFileRoute('/_authenticated/_app')({
  component: Layout,
})
