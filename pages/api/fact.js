import { sendEventsToAll } from './events';

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the new fact from the request body
    const newFact = req.body;
    
    // Send the new fact to all connected clients
    sendEventsToAll(newFact);
    
    // Return success
    return res.status(200).json(newFact);
  } catch (error) {
    console.error('Error updating fact:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
