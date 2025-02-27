import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

// Client context for LaunchDarkly
export const clientContext = {
  kind: "user",
  key: "user-key-123abc",
  name: "Brad Bunce",
  email: "brad@launchdarkly.com"
};

// Create LaunchDarkly provider for client-side rendering
export async function createLDProvider() {
  const clientSideID = process.env.REACT_APP_LD_CLIENTSIDE_ID;
  
  if (!clientSideID) {
    console.error('LaunchDarkly client-side ID is not set');
    return null;
  }

  try {
    const LDProvider = await asyncWithLDProvider({
      clientSideID,
      context: clientContext,
      options: {
        streaming: true
      }
    });
    
    return LDProvider;
  } catch (error) {
    console.error(`Error initializing LaunchDarkly client: ${error}`);
    return null;
  }
}
