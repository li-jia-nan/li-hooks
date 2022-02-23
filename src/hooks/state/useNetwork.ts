import { useEffect, useState } from 'react';

export interface NetworkState {
  since?: Date;
  online?: boolean;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

const getConnection = (): any => {
  const nav = navigator as any;
  if (typeof nav !== 'object') {
    return null;
  }
  return nav.connection || nav.mozConnection || nav.webkitConnection;
};

const getConnectionProperty = (): NetworkState => {
  const { rtt, type, saveData, downlink, downlinkMax, effectiveType } = getConnection() || {};
  return { rtt, type, saveData, downlink, downlinkMax, effectiveType };
};

const useNetwork = (): NetworkState => {
  const [state, setState] = useState(() => ({
    since: undefined,
    online: navigator?.onLine,
    ...getConnectionProperty(),
  }));

  useEffect(() => {
    const onOnline = (): void => {
      setState(prev => ({
        ...prev,
        online: true,
        since: new Date(),
      }));
    };
    const onOffline = (): void => {
      setState(prev => ({
        ...prev,
        online: false,
        since: new Date(),
      }));
    };
    const onConnectionChange = (): void => {
      setState(prev => ({
        ...prev,
        ...getConnectionProperty(),
      }));
    };

    window?.addEventListener(NetworkEventType.ONLINE, onOnline);
    window?.addEventListener(NetworkEventType.OFFLINE, onOffline);
    const connection = getConnection();
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);
    return () => {
      window?.removeEventListener(NetworkEventType.ONLINE, onOnline);
      window?.removeEventListener(NetworkEventType.OFFLINE, onOffline);
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
    };
  }, []);

  return state;
};

export default useNetwork;
