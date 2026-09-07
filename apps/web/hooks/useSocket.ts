import { useEffect, useState } from "react";

export function useSocket({token}: {token: string}) {
    // const [loading, setLoading] = useState(true);
    // const token = localStorage.getItem("token");
    
    const [socket, setSocket] = useState<WebSocket>();
    useEffect(() => {

        if(!token) return;
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}${token}`);
        ws.onopen = () => {
            setSocket(ws);
        }

        return() => {
            ws.close()
        }
    }, [token]);

    return socket
}
