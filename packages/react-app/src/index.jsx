import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'

import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.min.css'
import 'carbon-components/css/carbon-components.min.css'

import App from './App'
import './index.less'

const themes = {
  dark: `${process.env.PUBLIC_URL}/index.css`,
  // TODO: this is not used
  light: `${process.env.PUBLIC_URL}/light-theme.css`
}

// const prevTheme = window.localStorage.getItem('theme')
const defaultTheme = 'dark'

const subgraphUri =
  'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract'

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={defaultTheme}>
      <ConfigProvider locale={enUS}>
        <App subgraphUri={subgraphUri} />
      </ConfigProvider>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
