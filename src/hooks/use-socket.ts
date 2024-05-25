import React from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(url: string) {
    const [socket, setSocket] = React.useState<Socket|null>();

    React.useEffect(() => {
        setSocket(io(url));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, []);

    return socket;
}