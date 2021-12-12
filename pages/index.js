import Head from 'next/head'
import OHMData from '../components/ohmdata'
import ABIData from '../components/abidata'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'


const restLink = new RestLink({ 
  uri: "https://abachi-data.stickits.app/?rest_route=/abachi-data/" 
})

const abiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const ohmClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/drondin/olympus-graph',
  cache: new InMemoryCache()
})


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>OHM prices ~ Abachi.io</title>
        <meta name="description" content="Abachi.io (3²,3²) = (Ω²,Ω²)" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway"></link>
      </Head>

      <main className="main">
        
        <div id="abachi-logo">
          <a href="https://www.abachi.io/" target="_blank" rel="noreferrer">
            <img src="/abachi-logo.png" />
          </a>
        </div>

        <h1 className="title">
          <a href="https://www.abachi.io/" target="_blank" rel="noreferrer">Abachi.io (3²,3²) = (Ω²,Ω²)</a>
        </h1>

        <p className="description">Enabling DeFi for the traditional world</p>

        <ApolloProvider client={abiClient}>
          <ABIData />
        </ApolloProvider>

        <ApolloProvider client={ohmClient}>
          <OHMData />
        </ApolloProvider>

        <footer className="footer">
          <a href="https://www.abachi.io/" target="_blank" rel="noreferrer"> Abachi.io </a> ~ Backed and Powered by <a href="https://www.olympusdao.finance/" target="_blank" rel="noreferrer"> OHM </a> ~ <a href="https://github.com/CodeConnects/abachi-ohm-prices" target="_blank" rel="noreferrer">GitHub <img className="footer-img github-icon" src="github-icon.png" alt="github icon" /></a>
        </footer>

      </main>
    </div>
  )
}
