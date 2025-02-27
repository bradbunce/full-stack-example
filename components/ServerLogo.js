import { useState } from 'react';
import Image from 'next/image';

const ServerLogo = ({ initialFlagValue, flagInfo }) => {
  console.log('[ServerLogo] Component initializing with flag value:', initialFlagValue);
  
  const [flagValue] = useState(initialFlagValue);
  const [info] = useState(flagInfo || "The server-side feature flag evaluation is");
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="App-logo" style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {flagValue ? (
          <Image 
            src="/images/nodejsLogo.svg"
            alt="Node.js logo"
            width={100}
            height={100}
            priority={flagValue} // Only prioritize if this image is actually shown
          />
        ) : (
          <Image 
            src="/images/ldLogo_gray.svg"
            alt="LaunchDarkly logo"
            width={100}
            height={100}
            priority={!flagValue} // Only prioritize if this image is actually shown
          />
        )}
      </div>
      <p>{info} <b>{flagValue ? "TRUE" : "FALSE"}</b></p>
    </div>
  );
};

export default ServerLogo;
