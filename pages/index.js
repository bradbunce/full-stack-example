import { useEffect, useState } from 'react';
import Head from 'next/head';
import ClientLogo from '../components/ClientLogo';
import ServerLogo from '../components/ServerLogo';
import { getFeatureFlag, serverContext } from '../lib/launchdarkly-server';

export default function Home({ initialServerFlag, flagInfo }) {
  return (
    <div className="App">
      <Head>
        <title>Isomorphic LaunchDarkly Example</title>
        <meta name="description" content="Isomorphic application with LaunchDarkly feature flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="App-header">
        <p><b>React Web</b> client-side feature flag</p>
        <ClientLogo />
      </header>
      
      <br />
      
      <header className="App-header">
        <p><b>Node.js</b> server-side feature flag</p>
        <ServerLogo 
          initialFlagValue={initialServerFlag} 
          flagInfo={flagInfo} 
        />
      </header>
    </div>
  );
}

// This function runs on the server for SSR and during static generation
export async function getServerSideProps() {
  // Get the initial server-side flag value
  const featureFlagKey = "show-node-js-logo";
  const flagValue = await getFeatureFlag(featureFlagKey, serverContext, false);
  
  // Prepare the initial data for the page
  return {
    props: {
      initialServerFlag: flagValue,
      flagInfo: "The initial server-side feature flag evaluation is"
    }
  };
}
