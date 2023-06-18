import React, { useState, useEffect } from 'react';

const Network: React.FC = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <p>Online</p>
      ) : (
        <p>
          Offline. Please check your network connection and try again.
        </p>
      )}
    </div>
  );
};

export default Network;
