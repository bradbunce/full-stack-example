import { withLDConsumer } from "launchdarkly-react-client-sdk";
import ldLogo from '../img/ldLogo_gray.svg';
import reactLogo from '../img/reactLogo.svg';

const homeLogo = ({ flags, ldClient }) => {

  return flags.showReactLogo ? (
    <div>
      <img src={reactLogo} className="App-logo" alt="React logo" />
      <p>The client-side feature flag evaluation is <b>TRUE</b></p>
    </div>
  ) : (
    <div>
      <img src={ldLogo} className="App-logo" alt="LaunchDarkly logo" />
      <p>The client-side feature flag evaluation is <b>FALSE</b></p>
    </div>
  );
};

export default withLDConsumer()(homeLogo);