import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only connect if user is logged in, or connect anonymously if needed
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
