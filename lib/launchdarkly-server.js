// Initialize the LaunchDarkly client once for the entire server
let ldClient;

export function initLDClient() {
  if (ldClient) {
    return ldClient;
  }

  // Use dynamic require for the LaunchDarkly SDK
  // This is necessary because the SDK is designed for CommonJS
  const LaunchDarkly = require('@launchdarkly/node-server-sdk');

  const sdkKey = process.env.LD_SDK_KEY;
  if (!sdkKey) {
    console.error('LaunchDarkly SDK key is not set');
    return null;
  }

  ldClient = LaunchDarkly.init(sdkKey);
  return ldClient;
}

export async function getLDClient() {
  if (ldClient) {
    return ldClient;
  }

  const client = initLDClient();
  if (!client) {
    return null;
  }

  try {
    await client.waitForInitialization();
    console.log('*** LaunchDarkly SDK successfully initialized!');
    return client;
  } catch (error) {
    console.error(`*** LaunchDarkly SDK failed to initialize: ${error}`);
    return null;
  }
}

export async function getFeatureFlag(flagKey, context, defaultValue = false) {
  const client = await getLDClient();
  if (!client) {
    return defaultValue;
  }

  try {
    const value = await client.variation(flagKey, context, defaultValue);
    console.log(`*** Feature flag '${flagKey}' is ${value} for context: ${JSON.stringify(context)}`);
    return value;
  } catch (error) {
    console.error(`*** Error getting feature flag '${flagKey}': ${error}`);
    return defaultValue;
  }
}

// Server context for LaunchDarkly
export const serverContext = {
  kind: "server",
  key: "node-server",
  name: "Node.js Server"
};
