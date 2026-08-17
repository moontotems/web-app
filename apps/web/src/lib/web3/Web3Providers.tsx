import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { WagmiProvider } from 'wagmi'

import { wagmiConfig } from './config'

import '@rainbow-me/rainbowkit/styles.css'

export const Web3Providers = ({
  children,
  queryClient: queryClientProp,
}: {
  children: ReactNode
  queryClient?: QueryClient
}) => {
  const [fallbackClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  const queryClient = queryClientProp ?? fallbackClient

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0F62FE',
            accentColorForeground: '#ffffff',
            borderRadius: 'none',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
