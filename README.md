# Isomorphic LaunchDarkly Example

This is an isomorphic (universal) JavaScript application that demonstrates the use of LaunchDarkly feature flags in both server-side and client-side rendering contexts.

## What is an Isomorphic Application?

An isomorphic (or universal) application is a web application that can run both on the client and server sides. This approach offers several benefits:

- **Improved Performance**: Initial page load is rendered on the server, reducing time to first meaningful paint
- **Better SEO**: Search engines can better index content that's pre-rendered
- **Enhanced Accessibility**: Content is available even if JavaScript fails or is disabled
- **Code Reuse**: The same JavaScript code can run on both the server and client, reducing duplication

After the initial server-rendered page load, the application behaves like a single-page application (SPA), with the client taking over rendering for subsequent interactions.

## Feature Flags

This application demonstrates two types of feature flags:

1. **Server-side feature flags** using the LaunchDarkly Node.js SDK
2. **Client-side feature flags** using the LaunchDarkly React SDK

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- LaunchDarkly account (for full functionality)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
LD_SDK_KEY=your-launchdarkly-server-sdk-key
REACT_APP_LD_CLIENTSIDE_ID=your-launchdarkly-client-side-id
```

Replace the placeholder values with your actual LaunchDarkly SDK keys.

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000.

## How It Works

### Server-Side Rendering (SSR)

1. When a user requests the page, Next.js renders the React components on the server
2. The LaunchDarkly Node.js SDK evaluates feature flags on the server
3. The fully rendered HTML is sent to the client
4. The client-side JavaScript "hydrates" the HTML, making it interactive

### Flag Updates

To see updated flag values, you need to refresh the page or use the LaunchDarkly dashboard to change flag values. The application will display the latest flag values on page load.

## Feature Flags Used

- `show-node-js-logo` (server-side): Controls which logo is displayed in the server-side section
- `showReactLogo` (client-side): Controls which logo is displayed in the client-side section

## Project Structure

- `/components`: React components
- `/lib`: Utility functions and LaunchDarkly initialization
- `/pages`: Next.js pages and API routes
- `/public`: Static assets
- `/styles`: CSS styles
