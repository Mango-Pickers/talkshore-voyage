import { useEffect, useRef } from "react";

type Props = {
  roomUrl: string;
  userName?: string; // optional: pass user's name into the call
};

const LiveSession = ({ roomUrl, userName }: Props) => {
  const jitsiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!jitsiRef.current || !roomUrl) return;

    const domain = "meet.jit.si";

    // Extract room name safely
    const roomName = roomUrl.replace("https://meet.jit.si/", "");

    const options = {
      roomName,
      width: "100%",
      height: 500,
      parentNode: jitsiRef.current,
      userInfo: {
        displayName: userName || "Guest",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    // Cleanup on unmount
    return () => {
      api.dispose();
    };
  }, [roomUrl, userName]);

  return <div ref={jitsiRef} className="w-full h-[500px]" />;
};

export default LiveSession;