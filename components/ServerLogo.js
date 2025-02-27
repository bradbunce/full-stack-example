import { useState, useEffect } from 'react';
import Image from 'next/image';

const ServerLogo = ({ initialFlagValue, flagInfo }) => {
  const [flagValue, setFlagValue] = useState(initialFlagValue);
  const [info, setInfo] = useState(flagInfo || "The server-side feature flag evaluation is");

  // Set up SSE connection for real-time updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const events = new EventSource('/api/events');
      
      events.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.source === "TRUE" || parsedData.source === "FALSE") {
            setFlagValue(parsedData.source === "TRUE");
            if (parsedData.info) {
              setInfo(parsedData.info);
            }
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      return () => {
        events.close();
      };
    }
  }, []);

  return (
    <div>
      <Image 
        src={flagValue ? "/images/nodejsLogo.svg" : "/images/ldLogo_gray.svg"} 
        className="App-logo" 
        alt={flagValue ? "Node.js logo" : "LaunchDarkly logo"} 
        width={150} 
        height={150} 
      />
      <p>{info} <b>{flagValue ? "TRUE" : "FALSE"}</b></p>
    </div>
  );
};

export default ServerLogo;
