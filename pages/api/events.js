import { getFeatureFlag, serverContext } from '../../lib/launchdarkly-server';

// Store connected clients
let clients = [];
// Store current facts
let facts = { info: "Waiting for server-side feature flag evaluation", source: "FALSE" };

export default function handler(req, res) {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  // Send initial data
  res.write(`data: ${JSON.stringify(facts)}\n\n`);
  
  // Generate a unique client ID
  const clientId = Date.now();
  
  // Add this client to the connected clients
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  
  // When client closes connection, remove from the clients list
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });

  // Initialize LaunchDarkly and set up flag change listener
  const featureFlagKey = "show-node-js-logo";
  
  // Set up flag monitoring (only once)
  if (clients.length === 1) {
    initFlagMonitoring(featureFlagKey);
  }
}

// Function to send events to all connected clients
export function sendEventsToAll(newFacts) {
  facts = newFacts;
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(newFacts)}\n\n`);
  });
}

// Initialize LaunchDarkly flag monitoring
async function initFlagMonitoring(flagKey) {
  const { getLDClient } = await import('../../lib/launchdarkly-server');
  const client = await getLDClient();
  
  if (!client) {
    console.error('LaunchDarkly client not initialized');
    return;
  }
  
  // Check initial flag value
  const initialValue = await client.variation(flagKey, serverContext, false);
  console.log(`Initial flag value for ${flagKey}: ${initialValue}`);
  
  // Send initial value to clients
  sendEventsToAll({
    info: "The initial server-side feature flag evaluation is",
    source: initialValue ? "TRUE" : "FALSE"
  });
  
  // Set up flag change listener
  client.on(`update:${flagKey}`, () => {
    console.log(`Flag ${flagKey} was updated`);
    
    client.variation(flagKey, serverContext, false, (err, newValue) => {
      if (err) {
        console.error(`Error getting updated flag value: ${err}`);
        return;
      }
      
      console.log(`New flag value for ${flagKey}: ${newValue}`);
      
      // Send updated value to clients
      sendEventsToAll({
        info: "The server-side feature flag evaluation on flag change event is",
        source: newValue ? "TRUE" : "FALSE"
      });
    });
  });
}

// Configure the API route to not buffer responses
export const config = {
  api: {
    bodyParser: false,
  },
};
