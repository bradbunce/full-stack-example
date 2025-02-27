import { withLDConsumer } from "launchdarkly-react-client-sdk";
import Image from 'next/image';

const ClientLogo = ({ flags, ldClient }) => {
  // Default to false if flags is undefined or showReactLogo is not set
  const showReactLogo = flags && flags.showReactLogo === true;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="App-logo" style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showReactLogo ? (
          <Image 
            src="/images/reactLogo.svg" 
            alt="React logo" 
            width={100} 
            height={100}
            priority={showReactLogo} // Only prioritize if this image is actually shown
          />
        ) : (
          <Image 
            src="/images/ldLogo_gray.svg" 
            alt="LaunchDarkly logo" 
            width={100} 
            height={100}
            priority={!showReactLogo} // Only prioritize if this image is actually shown
          />
        )}
      </div>
      <p>The client-side feature flag evaluation is <b>{showReactLogo ? "TRUE" : "FALSE"}</b></p>
    </div>
  );
};

// Only use withLDConsumer on the client side
const ClientSideComponent = typeof window !== 'undefined' 
  ? withLDConsumer()(ClientLogo) 
  : ClientLogo;

export default ClientSideComponent;
