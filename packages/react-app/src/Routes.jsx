import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  LunarMap,
  All,
  Creature,
  Favorites,
  Minted,
  Wallet,
  ContractEvents,
  Contact,
  LegalNotice,
  PrivacyPolicy,
  TermsAndConditions
} from './pages'
import { Contract } from './sharedComponents'

export default function Routes({ ethereumProps, nftAppProps }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Home ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/lunar-map'>
        <LunarMap ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/all'>
        <All ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/totem/:id'>
        <Creature ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/favorites'>
        <Favorites ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/minted'>
        <Minted ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/wallet'>
        <Wallet ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/contract-events'>
        <ContractEvents
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </Route>
      <Route exact path='/contract-interface'>
        <Contract
          name='NFTokenMetadataEnumerableMock'
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </Route>

      <Route exact path='/contact'>
        <Contact />
      </Route>
      <Route exact path='/legal-notice'>
        <LegalNotice />
      </Route>
      <Route exact path='/imprint-privacy-policy'>
        <PrivacyPolicy />
      </Route>
      <Route exact path='/terms-and-conditions'>
        <TermsAndConditions />
      </Route>
    </Switch>
  )
}
