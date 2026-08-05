import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  type LucideIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'

export interface NavUserMenuItem {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  external?: boolean
}

export interface NavUserUser {
  name: string
  email: string
  avatar?: string
  initials?: string
}

export interface NavUserProps {
  user: NavUserUser
  /** Optional list of menu items shown above the logout button. */
  menuItems?: NavUserMenuItem[]
  /** Called when the user clicks "Log out". When omitted, the logout entry is hidden. */
  onLogout?: () => void
}

const defaultMenuItems: NavUserMenuItem[] = [
  { label: 'Account', icon: UserCircleIcon },
  { label: 'Billing', icon: CreditCardIcon },
  { label: 'Notifications', icon: BellIcon },
]

export function NavUser({ user, menuItems = defaultMenuItems, onLogout }: NavUserProps) {
  const { isMobile } = useSidebar()
  const initials = user.initials ?? user.name.slice(0, 2).toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-md">
                  {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
                  <AvatarFallback className="rounded-md">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {menuItems.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    if (item.href) {
                      return (
                        <DropdownMenuItem key={item.label} asChild>
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                          >
                            {Icon ? <Icon /> : null}
                            {item.label}
                          </a>
                        </DropdownMenuItem>
                      )
                    }
                    return (
                      <DropdownMenuItem key={item.label} onClick={item.onClick}>
                        {Icon ? <Icon /> : null}
                        {item.label}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuGroup>
              </>
            )}
            {onLogout ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
