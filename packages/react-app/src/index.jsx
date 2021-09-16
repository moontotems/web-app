import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import ReactDOM from 'react-dom'
import App from './App'
import './index.less'

/* TODO:
const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`
}
*/

/*
const PUBLIC_URL = 'http://localhost:3000'
const themes = {
  dark: `${PUBLIC_URL}/dark-theme.css`,
  light: `${PUBLIC_URL}/light-theme.css`
}
*/

const themes = {
  dark: 'http://localhost:3000/dark-theme.css',
  light: 'http://localhost:3000/light-theme.css'
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
      <App subgraphUri={subgraphUri} />
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
