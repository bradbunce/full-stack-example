import { withLDConsumer } from "launchdarkly-react-client-sdk";
import Image from 'next/image';

const ClientLogo = ({ flags, ldClient }) => {
  // Default to false if flags is undefined or showReactLogo is not set
  const showReactLogo = flags && flags.showReactLogo === true;
  
  return showReactLogo ? (
    <div>
      <Image 
        src="/images/reactLogo.svg" 
        className="App-logo" 
        alt="React logo" 
        width={150} 
        height={150} 
      />
      <p>The client-side feature flag evaluation is <b>TRUE</b></p>
    </div>
  ) : (
    <div>
      <Image 
        src="/images/ldLogo_gray.svg" 
        className="App-logo" 
        alt="LaunchDarkly logo" 
        width={150} 
        height={150} 
      />
      <p>The client-side feature flag evaluation is <b>FALSE</b></p>
    </div>
  );
};

// Only use withLDConsumer on the client side
const ClientSideComponent = typeof window !== 'undefined' 
  ? withLDConsumer()(ClientLogo) 
  : ClientLogo;

export default ClientSideComponent;
