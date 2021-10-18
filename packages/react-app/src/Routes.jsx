import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  LunarMap,
  LunarCalendar,
  Attributes,
  All,
  Creature,
  Favorites,
  Minted,
  Wallet,
  //ContractUI,
  ContractEvents,
  Contact,
  LegalNotice,
  PrivacyPolicy,
  TermsAndConditions
} from './pages'

export default function Routes({ ethereumProps, nftAppProps }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Home ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/lunar-map'>
        <LunarMap ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/lunar-calendar'>
        <LunarCalendar
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </Route>
      <Route exact path='/attributes'>
        <Attributes ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/all'>
        <All ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Route>
      <Route exact path='/moontotem/:id'>
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
      {/*
      <Route exact path='/contract-interface'>
        <ContractUI
          userSigner={userSigner}
          localProvider={localProvider}
          address={address}
          blockExplorer={blockExplorer}
          contractConfig={contractConfig}
        />
      </Route>
      */}

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
