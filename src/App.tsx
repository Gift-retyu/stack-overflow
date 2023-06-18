import React from 'react';
import Accordion from './Container';
import Network from './Component/Network';
import ErrorBoundary from './Wrappers/ErrorBoundary';

/**
 * The main application component.
 *
 * @component
 */
const App = () => {
  return (
    <div>
      <h1>StackOverFlow Cool Users</h1>
      <ErrorBoundary fallbackComponent={<p>An error occurred. Please try again.</p>}>
        <Network />
        <Accordion />
      </ErrorBoundary>
    </div>
  );
};

export default App;
