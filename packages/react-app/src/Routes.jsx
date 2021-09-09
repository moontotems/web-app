import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  All,
  Creature,
  Minted,
  Wallet,
  ContractEvents,
  Contact,
  LegalNotice,
  PrivacyPolicy,
  TermsAndConditions
} from './pages'
import { Contract } from './components'

export default function Routes({
  address,
  userSigner,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  ethPriceDollar,
  gasPrice,
  tx,
  writeContracts,
  readContracts,
  blockExplorer
}) {
  return (
    <Switch>
      <Route exact path='/'>
        <Home
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/all'>
        <All
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/creature/:id'>
        <Creature
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/minted'>
        <Minted
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/wallet'>
        <Wallet
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/contract-events'>
        <ContractEvents
          address={address}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          localProvider={localProvider}
          yourLocalBalance={yourLocalBalance}
          price={ethPriceDollar}
          gasPrice={gasPrice}
          tx={tx}
          writeContracts={writeContracts}
          readContracts={readContracts}
        />
      </Route>
      <Route exact path='/contract-interface'>
        <Contract
          name='NFTokenMetadataEnumerableMock'
          signer={userSigner}
          provider={localProvider}
          address={address}
          blockExplorer={blockExplorer}
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
