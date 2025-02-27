import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { createLDProvider } from '../lib/launchdarkly-client';

function MyApp({ Component, pageProps }) {
  // Store the provider component, not just a reference
  const [ldProviderState, setLdProviderState] = useState({
    initialized: false,
    LDProvider: null
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    async function initLaunchDarkly() {
      try {
        const provider = await createLDProvider();
        if (provider) {
          setLdProviderState({
            initialized: true,
            LDProvider: provider
          });
        }
      } catch (error) {
        console.error('Failed to initialize LaunchDarkly:', error);
        // Mark as initialized even on error to prevent further attempts
        setLdProviderState(prev => ({
          ...prev,
          initialized: true
        }));
      }
    }

    initLaunchDarkly();
  }, []);

  // Always render without provider on server or before initialization
  if (typeof window === 'undefined' || !ldProviderState.initialized || !ldProviderState.LDProvider) {
    return <Component {...pageProps} />;
  }

  // After client-side initialization, render with the LaunchDarkly provider
  const { LDProvider } = ldProviderState;
  return (
    <LDProvider>
      <Component {...pageProps} />
    </LDProvider>
  );
}

export default MyApp;
